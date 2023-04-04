import { Interface } from "@ethersproject/abi";
import {
  SimulContractTx,
  SimulSendNativeTx,
  Tupleable,
  TxLog,
} from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { toTuple } from "helpers";
import Account from "./Account";

/** Represents generic contract functionality. Needs to be extended by actual contracts like {@link Account}. */
export default abstract class Contract {
  /** contract's address */
  contractAddress: string;

  /** ABI interface */
  private iface: Interface;
  /** The connected wallet */
  private wallet: WalletState;

  protected constructor(
    abi: string[],
    contractAddress: string,
    wallet: WalletState
  ) {
    this.iface = new Interface(abi);
    this.contractAddress = contractAddress;
    this.wallet = wallet;
  }

  /**
   *
   * @param abi Contract ABI containing the description of the event to decode
   * @param eventTemplates Event template to use to populate the data
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
    return {
      from: this.wallet.address,
      to: this.contractAddress,
      data: encodedFuncData,
    };
  }

  /**
   * Creates an object containing data necessary to send some native coin value to an EVM contract.
   *
   * @param value Value of native coin to send.
   * @returns An object {@link SimulSendNativeTx} containing data necessary to send some native coin value to an EVM contract.
   */
  protected createNativeTx(value: string): SimulSendNativeTx {
    return {
      from: this.wallet.address,
      to: this.contractAddress,
      value,
    };
  }
}
