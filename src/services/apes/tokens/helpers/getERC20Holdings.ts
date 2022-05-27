import {
  ContractCallContext,
  ContractCallReturnContext,
  Multicall,
} from "ethereum-multicall";
import { utils } from "ethers";
import { ERC20Token } from "types/server/contracts";
import { CallIndexes, buildERC20CallContext } from "./buildERC20CallContext";

export async function getERC20Holdings(
  //ethers.providers
  nodeUrl: string,
  holderAddress: string,
  ERC20ContractAddresses: string[]
) {
  if (ERC20ContractAddresses.length <= 0) return [];

  const multicall = new Multicall({
    nodeUrl,
    tryAggregate: true,
  });

  const ERC20CallContexts: ContractCallContext[] = ERC20ContractAddresses.map(
    (contractAddr) =>
      buildERC20CallContext(contractAddr, holderAddress, contractAddr)
  );
  const contractCallResults = await multicall.call(ERC20CallContexts);
  return Object.entries(contractCallResults.results).map(
    ([_, contractCallReturnContext]) => buildToken(contractCallReturnContext)
  );
}

function buildToken(
  contractCallReturnContext: ContractCallReturnContext
): ERC20Token {
  const { callsReturnContext, originalContractCallContext } =
    contractCallReturnContext;
  const decimals = callsReturnContext[CallIndexes.DECIMALS].returnValues[0];
  const balance = callsReturnContext[CallIndexes.BALANCE].returnValues[0];
  return {
    contractAddress: originalContractCallContext.contractAddress,
    symbol: callsReturnContext[CallIndexes.SYMBOL].returnValues[0],
    decimals,
    name: callsReturnContext[CallIndexes.NAME].returnValues[0],
    balance: utils.formatUnits(balance, decimals),
  };
}
