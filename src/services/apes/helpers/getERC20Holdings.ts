import {
  ContractCallContext,
  ContractCallReturnContext,
  Multicall,
} from "ethereum-multicall";
import { TokenWithBalance } from "services/types";
import { TToken } from "types/aws";
import { ERC20Token } from "types/contracts";
import { formatUnits } from "helpers/evm";
import { CallIndexes, buildERC20CallContext } from "./buildERC20CallContext";

export async function getERC20Holdings(
  //ethers.providers
  nodeUrl: string,
  holderAddress: string,
  tokens: TToken[]
): Promise<TokenWithBalance[]> {
  if (tokens.length <= 0) return [];

  const multicall = new Multicall({
    nodeUrl,
    tryAggregate: true,
  });

  const ERC20CallContexts: ContractCallContext[] = tokens.map(({ token_id }) =>
    buildERC20CallContext(token_id, holderAddress, token_id)
  );
  const contractCallResults = await multicall.call(ERC20CallContexts);
  return Object.entries(contractCallResults.results).map(([_, result], i) => ({
    ...tokens[i],
    balance: extractBalance(result),
  }));
}

function extractBalance(
  contractCallReturnContext: ContractCallReturnContext
): number {
  const { callsReturnContext } = contractCallReturnContext;
  const decimals = callsReturnContext[CallIndexes.DECIMALS].returnValues[0];
  const balance = callsReturnContext[CallIndexes.BALANCE].returnValues[0];
  return +formatUnits(balance, decimals);
}
