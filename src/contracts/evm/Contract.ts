import { Interface } from "@ethersproject/abi";
import {
  SimulContractTx,
  SimulSendNativeTx,
  Tupleable,
  TxLog,
} from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { toTuple } from "helpers";

export default abstract class Contract {
  contractAddress: string;

  protected iface: Interface;
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

  protected static decodeEventInternal<
    T extends { [key: string]: object },
    K extends Extract<keyof T, string>
  >(abi: string[], eventTemplates: T, event: K, logs: TxLog[]): T[K] | null {
    const iface = new Interface(abi);
    const topic = iface.getEventTopic(event);
    const log = logs.find((log) => log.topics.includes(topic));

    if (!log) {
      return null;
    }

    const result = iface.decodeEventLog(event, log.data, log.topics);

    return Object.keys(eventTemplates[event]).reduce(
      (res, key, i) => {
        res[key as keyof T[K]] = result[i];
        return res;
      },
      { ...eventTemplates[event] }
    );
  }

  encode(funcName: string, args: Tupleable): string {
    const func = this.iface.getFunction(funcName);
    return this.iface.encodeFunctionData(func, toTuple(args));
  }

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

  protected createNativeTx(value: string): SimulSendNativeTx {
    return {
      from: this.wallet.address,
      to: this.contractAddress,
      value,
    };
  }
}
