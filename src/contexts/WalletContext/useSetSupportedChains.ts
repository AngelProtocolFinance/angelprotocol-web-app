import { useEffect } from "react";
import { BaseChain } from "types/aws";
import { useLazyChainsQuery } from "services/apes";
import { logger } from "helpers";
import { chainIDs } from "constants/chains";

export default function useSetSupportedChains(
  supportedChainIds: chainIDs[],
  setSupportedChains: (chains: BaseChain[]) => void
) {
  const [getChains] = useLazyChainsQuery();

  useEffect(() => {
    (async function () {
      const {
        data: chains,
        isLoading: areChainsLoading,
        isSuccess,
      } = await getChains(null, true);

      if (!areChainsLoading && isSuccess) {
        setSupportedChains(
          supportedChainIds.map((suppChainId) => {
            const chain = chains.find(
              (chain) => chain.chain_id === suppChainId
            );
            if (!chain) {
              logger.error(
                `Chain ${suppChainId} not returned in the chains collection`
              );
              return { chain_id: suppChainId, chain_name: suppChainId };
            }

            return { ...chain };
          })
        );
      }
    })();
  }, [supportedChainIds, setSupportedChains, getChains]);
}
