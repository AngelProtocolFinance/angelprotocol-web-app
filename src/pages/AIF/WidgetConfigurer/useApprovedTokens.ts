import { useEffect, useState } from "react";
import { Token } from "types/aws";
import { useLazyChainQuery } from "services/apes";
import { useGetWallet } from "contexts/WalletContext";
import { chainIds } from "constants/chainIds";

export default function useApprovedTokens(): string[] {
  const { wallet } = useGetWallet();
  const [approvedTokens, setApprovedTokens] = useState<string[]>([]);

  const [getChain] = useLazyChainQuery();

  useEffect(() => {
    if (!wallet?.address) {
      return;
    }

    (async function () {
      const getChainPromises = Object.values(chainIds).map((chainId) =>
        getChain({ address: wallet?.address, chainId }, true).unwrap()
      );

      const chainDataArray = await Promise.all(getChainPromises);

      function pushToken(token: Token) {
        if (token.approved) {
          approvedTokenSymbols.push(token.symbol);
        }
      }

      const approvedTokenSymbols: string[] = [];
      chainDataArray.forEach((chain) => {
        chain.tokens.forEach((token) => {
          pushToken(token);
        });
        pushToken(chain.native_currency);
      });

      setApprovedTokens(approvedTokenSymbols);
    })();
  }, [wallet, getChain]);

  return approvedTokens;
}
