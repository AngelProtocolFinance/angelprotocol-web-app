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
  const [isLoading, setLoading] = useState(true);

  const { handleError } = useErrorContext();

  const {
    data: newChains,
    isLoading: areChainsLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useChainsQuery(null);

  const isChainsLoading = areChainsLoading || isFetching;

  useEffect(() => {
    if (isChainsLoading) {
      return;
    }

    setLoading(true);
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
            `None of the supported chains were returned (${supportedChainIds.join(
              ", "
            )})`
          )
        );
      }

      setSupportedChains(result);
      setLoading(false);
    }
  }, [
    supportedChainIds,
    isChainsLoading,
    isSuccess,
    isError,
    error,
    newChains,
    handleError,
  ]);

  return { isLoading: isChainsLoading || isLoading, supportedChains };
}
