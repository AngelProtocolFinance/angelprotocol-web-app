import { Interface } from "@ethersproject/abi";
import { SimulContractTx, SimulSendNativeTx, Tupleable } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { toTuple } from "helpers";

export default abstract class Contract<T extends { [key: string]: Tupleable }> {
  contractAddress: string;

  private iface: Interface;
  private wallet: WalletState;

  constructor(abi: string[], contractAddress: string, wallet: WalletState) {
    this.iface = new Interface(abi);
    this.contractAddress = contractAddress;
    this.wallet = wallet;
  }

  encode<K extends Extract<keyof T, string>>(funcName: K, args: T[K]): string {
    const func = this.iface.getFunction(funcName);
    return this.iface.encodeFunctionData(func, toTuple(args));
  }

  createContractTx<K extends Extract<keyof T, string>>(
    funcName: K,
    args: T[K]
  ): SimulContractTx {
    const encodedFuncData = this.encode(funcName, args);
    return {
      from: this.wallet.address,
      to: this.contractAddress,
      data: encodedFuncData,
    };
  }

  createNativeTx(value: string): SimulSendNativeTx {
    return {
      from: this.wallet.address,
      to: this.contractAddress,
      value,
    };
  }
}
