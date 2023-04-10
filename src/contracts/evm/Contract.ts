import { Interface } from "@ethersproject/abi";
import { AbiFragments, FetchResult, Query, ResultDecoder } from "./types";
import { SimulContractTx, Tupleable, TxLog } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { toTuple } from "helpers";
import { EIPMethods } from "constants/evm";
import { POLYGON_RPC } from "constants/urls";

/** Represents generic contract functionality. Needs to be extended by actual contracts. */
export class Contract<
  Functions extends { [key: string]: Tupleable },
  Events extends { [key: string]: Tupleable },
  Queries extends { [key: string]: Query<any, any, any> }
> {
  /** contract's address */
  address: string;

  /** ABI interface */
  protected iface: Interface;
  /** The connected wallet */
  protected wallet: WalletState | undefined;

  protected eventTemplates: Events;
  protected resultDecoders: {
    [key in keyof Queries]: ResultDecoder<
      Queries[key]["decodedResult"],
      Queries[key]["finalResult"]
    >;
  };

  protected constructor(
    abi: AbiFragments,
    address: string,
    eventTemplates: Events,
    resultDecoders: {
      [key in keyof Queries]: ResultDecoder<
        Queries[key]["decodedResult"],
        Queries[key]["finalResult"]
      >;
    },
    wallet?: WalletState
  ) {
    this.iface = new Interface(abi);
    this.address = address;
    this.eventTemplates = eventTemplates;
    this.resultDecoders = resultDecoders;
    // should add check confirming the wallet is connected to an EVM chain
    this.wallet = wallet;
  }

  /**
   *
   * @param aif New AIF to create.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  createTx<T extends Extract<keyof Functions, string>>(
    funcName: T,
    args: Functions[T]
  ): SimulContractTx {
    return this.createTxInternal(funcName, args);
  }

  /**
   *
   * @param aif New AIF to create.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  private createTxInternal<
    T extends Extract<keyof Functions, string> | Extract<keyof Queries, string>
  >(funcName: T, args: Functions[T] | Queries[T]): SimulContractTx {
    const encodedFuncData = this.encode(funcName, args);

    const tx: SimulContractTx = {
      to: this.address,
      data: encodedFuncData,
    };

    if (this.wallet) {
      tx.from = this.wallet?.address;
    }

    return tx;
  }

  /**
   * Wrapper around the parent's event decoder that ensures only expected events are decoded for this contract.
   *
   * @param event Name of the event to be decoded.
   * @param logs Transaction logs.
   * @returns The specified event's arguments if it was found (if it was emitted). Otherwise returns `null`.
   * @see {@link Events}
   */
  decodeEvent = <K extends Extract<keyof Events, string>>(
    event: K,
    logs: TxLog[]
  ): Events[K] | null => {
    const topic = this.iface.getEventTopic(event);

    // Find the event in the logs
    const log = logs.find((log) => log.topics.includes(topic));
    if (!log) {
      return null;
    }

    // decode event arguments (untyped)
    const result = this.iface.decodeEventLog(event, log.data, log.topics);

    // populate the resulting event arguments object using the event template (`eventTemplate`)
    return Object.keys(this.eventTemplates[event]).reduce(
      (res, key, i) => {
        // this is cast is safe to do because `key` is by definition a `keyof T[K]`
        res[key as keyof Events[K]] = result[i];
        return res;
      },
      { ...this.eventTemplates[event] }
    );
  };

  encode<
    T extends Extract<keyof Functions, string> | Extract<keyof Queries, string>
  >(funcName: T, args: Functions[T] | Queries[T]): string {
    const func = this.iface.getFunction(funcName);
    return this.iface.encodeFunctionData(func, toTuple(args));
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param address Address for which to fetch token balances.
   * @param providerId Provider ID to use to query balances.
   * @returns A Promise of {@link Coin} which contains the balance and denomination of the coin for the specified address
   */
  query<T extends Extract<keyof Queries, string>>(
    funcName: T,
    args: Queries[T]["args"]
  ): Promise<Queries[T]["finalResult"]> {
    const tx = this.createTxInternal(funcName, args);

    const result = fetch(POLYGON_RPC, {
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
      .then<Queries[T]["finalResult"]>((res) => {
        if ("error" in res) {
          throw new Error(`error ${funcName}:` + res.error.message);
        }

        const decodedResult: Queries[T]["decodedResult"] =
          this.iface.decodeFunctionResult(
            "queryEndowmentDetails",
            res.result
          )[0];
        return this.resultDecoders[funcName](
          decodedResult,
          this.address,
          this.iface
        );
      })
      .catch((err) => {
        throw new Error(err);
      });

    return result;
  }
}
