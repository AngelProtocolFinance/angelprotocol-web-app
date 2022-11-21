import ERC20Abi from "abi/ERC20.json";
import { ContractCallContext } from "ethereum-multicall";

export enum CallIndexes {
  BALANCE,
  SYMBOL,
  DECIMALS,
  NAME,
}

export function buildERC20CallContext(
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
      {
        reference: "symbol",
        methodName: "symbol",
        methodParameters: [],
      },
      {
        reference: "decimals",
        methodName: "decimals",
        methodParameters: [],
      },
      {
        reference: "name",
        methodName: "name",
        methodParameters: [],
      },
    ],
  };
}
