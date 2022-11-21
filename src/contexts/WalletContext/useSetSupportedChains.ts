import { useEffect } from "react";
import { BaseChain } from "types/aws";
import { useLazyChainsQuery } from "services/apes";
import { logger } from "helpers";

export default function useSetSupportedChains(
  supportedChains: BaseChain[],
  setSupportedChains: (chains: BaseChain[]) => void
) {
  const [getChains] = useLazyChainsQuery();

  useEffect(() => {
    (async function () {
      const {
        data: chains,
        isLoading: areChainsLoading,
        isSuccess,
      } = await getChains(null);

      if (!areChainsLoading && isSuccess) {
        setSupportedChains(
          supportedChains.map((suppChain) => {
            const chain = chains.find(
              (chain) => chain.chain_id === suppChain.chain_id
            );
            if (!chain) {
              logger.error(
                `Chain ${suppChain.chain_id} not returned in the chains collection`
              );
              return { ...suppChain };
            }

            return { ...chain };
          })
        );
      }
    })();
  }, [supportedChains, setSupportedChains, getChains]);
}
