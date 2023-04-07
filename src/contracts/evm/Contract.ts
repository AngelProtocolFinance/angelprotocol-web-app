import { Interface } from "@ethersproject/abi";
import {
  SimulContractTx,
  SimulSendNativeTx,
  Tupleable,
  TxLog,
} from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { toTuple } from "helpers";
import { EIPMethods } from "constants/evm";
import { POLYGON_RPC } from "constants/urls";

type FetchResult =
  | { result: string }
  | { error: { code: number; message: string } };

export type ResultDecoder<Result> = (
  result: string,
  iface: Interface,
  contractAddress: string
) => Result;

export type Query<Args extends Tupleable, Result> = {
  args: Args;
  result: Result;
};

/** Represents generic contract functionality. Needs to be extended by actual contracts. */
export class Contract {
  /** contract's address */
  contractAddress: string;

  /** ABI interface */
  protected iface: Interface;
  /** The connected wallet */
  protected wallet: WalletState | undefined;

  protected constructor(
    abi: string[],
    contractAddress: string,
    wallet?: WalletState
  ) {
    this.iface = new Interface(abi);
    this.contractAddress = contractAddress;
    // should add check confirming the wallet is connected to an EVM chain
    this.wallet = wallet;
  }

  /**
   *
   * @param abi Contract ABI containing the description of the event to decode.
   * @param eventTemplate Event template to use to populate the expected data (event args). Easier to use it as a const than as a type, as it allows for field iteration such as `Object.keys(evenTemplate).map(...)`
   * @param event Name of the event to decode
   * @param logs Transaction logs.
   * @returns The specified event's arguments if it was found (if it was emitted). Otherwise returns `null`.
   */
  protected static decodeEventInternal<
    T extends { [key: string]: object },
    K extends Extract<keyof T, string>
  >(abi: string[], eventTemplate: T[K], event: K, logs: TxLog[]): T[K] | null {
    const iface = new Interface(abi);
    const topic = iface.getEventTopic(event);

    // Find the event in the logs
    const log = logs.find((log) => log.topics.includes(topic));
    if (!log) {
      return null;
    }

    // decode event arguments (untyped)
    const result = iface.decodeEventLog(event, log.data, log.topics);

    // populate the resulting event arguments object using the event template (`eventTemplate`)
    return Object.keys(eventTemplate).reduce(
      (res, key, i) => {
        // this is cast is safe to do because `key` is by definition a `keyof T[K]`
        res[key as keyof T[K]] = result[i];
        return res;
      },
      { ...eventTemplate }
    );
  }

  /**
   * Encodes transaction data.
   *
   * @param funcName Function name
   * @param args Function arguments
   * @returns String value representing the encoded combination of function name and its arguments
   */
  encode(funcName: string, args: Tupleable): string {
    const func = this.iface.getFunction(funcName);
    return this.iface.encodeFunctionData(func, toTuple(args));
  }

  /**
   * Creates an object containing data necessary to invoke an EVM contract.
   *
   * @param funcName Function name
   * @param args Function arguments
   * @returns An object {@link SimulContractTx} containing data necessary to invoke an EVM contract.
   */
  protected createContractTx(
    funcName: string,
    args: Tupleable
  ): SimulContractTx {
    const encodedFuncData = this.encode(funcName, args);

    const tx: SimulContractTx = {
      to: this.contractAddress,
      data: encodedFuncData,
    };

    if (this.wallet) {
      tx.from = this.wallet?.address;
    }

    return tx;
  }

  /**
   * Creates an object containing data necessary to send some native coin value to an EVM contract.
   *
   * @param from Sender.
   * @param to Target address.
   * @param value Value of native coin to send.
   * @returns An object {@link SimulSendNativeTx} containing data necessary to send some native coin value to an EVM contract.
   */
  static createTransferTx(
    from: string,
    to: string,
    value: string
  ): SimulSendNativeTx {
    return { from, to, value };
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param address Address for which to fetch token balances.
   * @param providerId Provider ID to use to query balances.
   * @returns A Promise of {@link Coin} which contains the balance and denomination of the coin for the specified address
   */
  protected async queryInternal<Result>(
    funcName: string,
    args: Tupleable,
    decode: ResultDecoder<Result>
  ): Promise<Result> {
    const tx = this.createContractTx(funcName, args);

    const result = await fetch(POLYGON_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: EIPMethods.eth_call,
        params: [tx, "latest"],
      }),
    })
      .then<FetchResult>((res) => {
        if (!res.ok) {
          throw new Error(`failed query ${funcName}`);
        }
        return res.json();
      })
      .then<Result>((res) => {
        if ("error" in res) {
          throw new Error(`error ${funcName}:` + res.error.message);
        }

        return decode(res.result, this.iface, this.contractAddress);
      })
      .catch((err) => {
        throw new Error(err);
      });

    return result;
  }
}
