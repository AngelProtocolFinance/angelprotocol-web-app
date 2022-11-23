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
  const [isLoading, setLoading] = useState(false);

  const { handleError } = useErrorContext();

  const {
    data: newChains,
    isLoading: areChainsLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useChainsQuery(null);

  const isChainsQueryLoading = areChainsLoading || isFetching;

  useEffect(() => {
    if (isChainsQueryLoading) {
      return;
    }

    setLoading(true);
    if (isError) {
      handleError(error);
    } else if (isSuccess) {
      const result: BaseChain[] = getSupportedChains(
        supportedChainIds,
        newChains
      );

      if (!result.length) {
        const suppChainsStr = supportedChainIds.join(", ");
        return handleError(
          new UnexpectedStateError(
            `None of the supported chains were returned (${suppChainsStr})`
          )
        );
      }

      setSupportedChains(result);
    }

    setLoading(false);
  }, [
    supportedChainIds,
    isChainsQueryLoading,
    isSuccess,
    isError,
    error,
    newChains,
    handleError,
  ]);

  return { isLoading: isChainsQueryLoading || isLoading, supportedChains };
}

function getSupportedChains(
  supportedChainIds: chainIDs[],
  newChains: BaseChain[]
): BaseChain[] {
  const result: BaseChain[] = [];

  supportedChainIds.forEach((suppChainId) => {
    const chain = newChains.find((chain) => chain.chain_id === suppChainId);
    if (chain) {
      return result.push({ ...chain });
    }

    logger.info(`Chain ${suppChainId} not returned in the chains collection`);
  });

  return result;
}
