import { useCallback } from "react";
import { InjectedProvider } from "types/ethereum";
import { useLazyChainQuery } from "services/apes";
import { WalletError } from "errors/errors";
import { EIPMethods } from "constants/ethereum";
import toPrefixedHex from "../helpers/toPrefixedHex";

export function useAddEthereumChain() {
  const [getChain] = useLazyChainQuery();

  const addEthereumChain = useCallback(
    async (
      injectedProvider: InjectedProvider,
      address: string,
      chainId: string
    ) => {
      if (!chainId || !injectedProvider) {
        return;
      }
      try {
        const chainToAdd = await getChain({ address, chainId }, true).unwrap();

        await injectedProvider.request({
          method: EIPMethods.wallet_addEthereumChain,
          params: [
            {
              chainId: toPrefixedHex(chainId),
              chainName: chainToAdd.chain_name,
              nativeCurrency: {
                name: chainToAdd.native_currency.name,
                symbol: chainToAdd.native_currency.symbol,
                decimals: chainToAdd.native_currency.decimals,
              },
              rpcUrls: [chainToAdd.rpc_url],
              blockExplorerUrls: [chainToAdd.block_explorer_url],
            },
          ],
        });
      } catch (addError: any) {
        throw new WalletError(
          addError?.message || "Unknown error occured",
          addError?.code || 0
        );
      }
    },
    [getChain]
  );

  return addEthereumChain;
}
