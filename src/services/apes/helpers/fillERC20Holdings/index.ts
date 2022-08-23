import { ContractCallContext, Multicall } from "ethereum-multicall";
import { utils } from "ethers";
import { Token } from "types/server/aws";
import { CallIndexes, buildCallContext } from "./buildCallContext";

export async function fillERC20Holdings(
  //ethers.providers
  nodeUrl: string,
  holderAddress: string,
  erc20s: Token[]
): Promise<Token[]> {
  if (erc20s.length <= 0) return [];

  const multicall = new Multicall({
    nodeUrl,
    tryAggregate: true,
  });

  const callContexts: ContractCallContext[] = erc20s.map(({ token_id }) =>
    buildCallContext(token_id, holderAddress, token_id)
  );

  const callRes = await multicall.call(callContexts);
  return Object.entries(callRes.results).map(
    ([_, { callsReturnContext }], i) => {
      const balContext = callsReturnContext[CallIndexes.BALANCE];
      const balance = balContext.success ? balContext.returnValues[0] : 0;
      return {
        ...erc20s[i],
        balance: +utils.formatUnits(balance, erc20s[i].decimals),
      };
    }
  );
}
