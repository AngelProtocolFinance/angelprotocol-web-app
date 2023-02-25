import { GENERIC_ERROR_MESSAGE } from "@giving/constants/common";
import { EIPMethods } from "@giving/constants/ethereum";
import { WalletError } from "@giving/errors";
import { useLazyChainQuery } from "@giving/services/apes";
import { useCallback } from "react";
import { InjectedProvider } from "@giving/types/ethereum";
import { toPrefixedHex } from "../helpers";

export function useAddEthereumChain() {
  const [getChain] = useLazyChainQuery();

  const addEthereumChain = useCallback(
    async (
      injectedProvider: InjectedProvider,
      address: string,
      chainId: string
    ) => {
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
          addError?.message || GENERIC_ERROR_MESSAGE,
          addError?.code || 0
        );
      }
    },
    [getChain]
  );

  return addEthereumChain;
}
