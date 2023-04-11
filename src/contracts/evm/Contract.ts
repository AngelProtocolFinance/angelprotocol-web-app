import { Interface } from "@ethersproject/abi";
import { AbiFragments, FetchResult, Query, ResultDecoder } from "./types";
import { SimulContractTx, Tupleable, TxLog } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { toTuple } from "helpers";
import { EIPMethods } from "constants/evm";
import { POLYGON_RPC } from "constants/urls";

/** Represents generic contract functionality. Needs to be extended by actual contracts. */
export class Contract<
  Queries extends { [key: string]: Query<any, any> },
  Functions extends { [key in keyof Queries]: Queries[key]["args"] } & {
    [key: string]: Tupleable;
  },
  Events extends { [key: string]: Tupleable }
> {
  /** contract's address */
  address: string;

  /** ABI interface */
  protected iface: Interface;
  /** The connected wallet */
  protected wallet: WalletState | undefined;

  /** Event templates used to populate the decoded event object */
  protected eventTemplates: Events;
  /** Decoder functions used to decode query results */
  protected resultDecoders: {
    [key in keyof Queries]: ResultDecoder<Queries[key]["result"]>;
  };

  /**
   * @param abi ABI interface.
   * @param address contract's address.
   * @param eventTemplates Event templates used to populate the decoded event object.
   * @param resultDecoders Decoder functions used to decode query results.
   * @param wallet The connected wallet.
   */
  protected constructor(
    abi: AbiFragments,
    address: string,
    eventTemplates: Events,
    resultDecoders: {
      [key in keyof Queries]: ResultDecoder<Queries[key]["result"]>;
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
   * @param funcName Target contract function name.
   * @param args Target function arguments.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  createTx<T extends Extract<keyof Functions, string>>(
    funcName: T,
    args: Functions[T]
  ): SimulContractTx {
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
   * Takes the log array, finds the specified event and if found decodes its data into a predefined object {@link eventTemplates}.
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

  /**
   * Encoded function name and its arguments in format acceptable by EVM.
   *
   * @param funcName Target contract function name.
   * @param args Target function arguments.
   * @returns Encoded value of function name + arguments.
   */
  encode<T extends Extract<keyof Functions, string>>(
    funcName: T,
    args: Functions[T]
  ): string {
    const func = this.iface.getFunction(funcName);
    return this.iface.encodeFunctionData(func, toTuple(args));
  }

  /**
   * Queries contracts and decodes result into a predefined result type. Accepts only those functio names
   * defined in {@link Queries} type, but since `Queries` is a part of the {@link Functions} type,
   * arguments are extract from it (`Functions`) to make sure correct ones are used.
   * (otherwise error appears in call to `createTx`).
   *
   * @param funcName Target contract function name to query.
   * @param args Target function arguments.
   * @returns A Promise of query resulted created as the predefined result type.
   */
  query<T extends Extract<keyof Queries, string>>(
    funcName: T,
    args: Functions[T]
  ): Promise<Queries[T]["result"]> {
    const tx = this.createTx(funcName, args);

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
      .then<Queries[T]["result"]>((res) => {
        if ("error" in res) {
          throw new Error(`error ${funcName}:` + res.error.message);
        }

        return this.resultDecoders[funcName](res.result, this.iface);
      })
      .catch((err) => {
        throw new Error(err);
      });

    return result;
  }
}
