import ERC20Abi from "abi/ERC20.json";
import { ContractCallContext } from "ethereum-multicall";

export enum CallIndexes {
  BALANCE,
}

export function buildCallContext(
  reference: string,
  holderAddress: string,
  contractAddress: string
): ContractCallContext {
  return {
    reference,
    contractAddress,
    abi: ERC20Abi,
    calls: [
      {
        reference: "balance",
        methodName: "balanceOf",
        methodParameters: [holderAddress],
      },
    ],
  };
}
