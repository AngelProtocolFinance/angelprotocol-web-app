import ERC20Abi from "abi/ERC20.json";
import { Multicall } from "ethereum-multicall";
import { CallContext } from "ethereum-multicall/dist/esm/models";
import { formatUnits } from "ethers/lib/utils";
import { BalMap } from "./types";
import { Token } from "types/aws";

enum CALL_IDX {
  BALANCE,
  DECIMALS,
}
export async function getERC20Holdings(
  //ethers.providers
  nodeUrl: string,
  holderAddress: string,
  tokens: Token[]
): Promise<BalMap> {
  if (tokens.length <= 0) return {};

  const multicall = new Multicall({
    nodeUrl,
    tryAggregate: true,
  });

  const res = await multicall.call(
    tokens.map(({ token_id }) => {
      const calls: CallContext[] = [];
      calls[CALL_IDX.BALANCE] = {
        reference: "balance",
        methodName: "balanceOf",
        methodParameters: [holderAddress],
      };
      calls[CALL_IDX.DECIMALS] = {
        reference: "decimals",
        methodName: "decimals",
        methodParameters: [],
      };
      return {
        abi: ERC20Abi,
        calls,
        reference: token_id,
        contractAddress: token_id,
      };
    })
  );
  return Object.entries(res.results).reduce((map, [_, result]) => {
    const { callsReturnContext: ctx, originalContractCallContext: callCTX } =
      result;
    const decimals = ctx[CALL_IDX.DECIMALS].returnValues[0];
    const balance = ctx[CALL_IDX.BALANCE].returnValues[0];
    map[callCTX.contractAddress] = +formatUnits(balance, decimals);
    return map;
  }, {} as BalMap);
}
