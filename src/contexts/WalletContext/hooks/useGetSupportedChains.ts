import { useEffect, useState } from "react";
import { BaseChain } from "types/aws";
import { useChainsQuery } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import { logger } from "helpers";
import { UnexpectedStateError } from "errors/errors";
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
      const result: BaseChain[] = [];

      supportedChainIds.forEach((suppChainId) => {
        const chain = newChains.find((chain) => chain.chain_id === suppChainId);
        if (chain) {
          return result.push({ ...chain });
        }

        logger.info(
          `Chain ${suppChainId} not returned in the chains collection`
        );
      });

      if (!supportedChainIds.length) {
        return handleError(
          new UnexpectedStateError(
            `None of the supported chains was returned (${supportedChainIds.join(
              ", "
            )})`
          )
        );
      }

      setSupportedChains(result);
    }
  }, [
    supportedChainIds,
    isLoading,
    isSuccess,
    isError,
    error,
    newChains,
    handleError,
  ]);

  return { isLoading, supportedChains };
}
