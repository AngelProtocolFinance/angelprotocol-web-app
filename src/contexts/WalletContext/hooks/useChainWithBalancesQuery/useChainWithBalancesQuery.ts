import { Chain } from "types/aws";
import { useChainQuery } from "services/apes";
import usePopulateBalances from "./usePopulateBalances";
import useVerifyChain from "./useVerifyChain";

type Result = { chain: Chain; isLoading: boolean };

export function useChainWithBalancesQuery(
  address: string | undefined,
  chainId: string | undefined,
  disconnect: () => void
): Result {
  const {
    data: chain,
    isLoading: isChainLoading,
    isFetching,
    error,
  } = useChainQuery(chainId, { skip: !chainId });

  useVerifyChain(chain, error, disconnect);

  const isChainDataLoading = isChainLoading || isFetching;
  const populated = usePopulateBalances(chain, address, isChainDataLoading);

  return populated;
}
