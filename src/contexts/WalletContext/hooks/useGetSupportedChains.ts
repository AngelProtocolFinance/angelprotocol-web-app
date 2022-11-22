import { useEffect, useState } from "react";
import { BaseChain } from "types/aws";
import { useChainsQuery } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import { logger } from "helpers";
import { chainIDs } from "constants/chains";

export function useGetSupportedChains(supportedChainIds: chainIDs[]) {
  const [supportedChains, setSupportedChains] = useState(() =>
    supportedChainIds.map(
      (chain_id) =>
        ({
          chain_id,
          chain_name: chain_id,
        } as BaseChain)
    )
  );

  const { handleError } = useErrorContext();

  const {
    data: newChains,
    isLoading: areChainsLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useChainsQuery(null);

  const isLoading = areChainsLoading || isFetching;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      handleError(error);
    } else if (isSuccess) {
      const supportedChains: BaseChain[] = [];

      supportedChainIds.forEach((suppChainId) => {
        const chain = newChains.find((chain) => chain.chain_id === suppChainId);
        if (chain) {
          return supportedChains.push({ ...chain });
        }

        logger.info(
          `Chain ${suppChainId} not returned in the chains collection`
        );
      });

      setSupportedChains(supportedChains);
    }
  }, [supportedChainIds, isLoading, isSuccess, isError, error, handleError]);

  return { isLoading, supportedChains };
}
