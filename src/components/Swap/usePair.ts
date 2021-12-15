import { useState, useEffect } from "react";
import { useConnectedWallet } from "@terra-dev/use-wallet";
import { Pair, PairResult, Pairs, TokenInfo } from "contracts/types";
import LbpFactory from "contracts/LbpFactory";
import { currency_icons, currency_text, UUSD } from "constants/currency";

export interface TokenResult {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

export let tokenInfos: Map<string, TokenInfo> = new Map<string, TokenInfo>([
  [
    UUSD,
    {
      contract_addr: "",
      symbol: currency_text.uusd,
      name: UUSD,
      decimals: 6,
      icon: currency_icons.uusd,
    },
  ],
]);

export default function usePair() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Pairs>({ pairs: [] });
  const wallet = useConnectedWallet();
  const [networkName, setNetworkName] = useState<any>("");

  async function getPairInfo(contract_addr: string) {
    const factoryContract = new LbpFactory(wallet);
    const tokenResult: PairResult = await factoryContract.getPairInfo(
      contract_addr
    );
    return tokenResult;
  }

  async function fetchTokenInfo(token_contract: string) {
    const factoryContract = new LbpFactory(wallet);
    const tokenResult: TokenResult = await factoryContract.getTokenInfo(
      token_contract
    );
    return tokenResult;
  }

  useEffect(() => {
    try {
      if (
        isLoading ||
        (result.pairs.length === 0 && networkName === wallet?.network.name)
      )
        return;
      setNetworkName(wallet?.network.name);
      const factoryContract = new LbpFactory(wallet);
      const getTokenInfo = async (info: NativeInfo | AssetInfo) => {
        let tokenInfo: TokenInfo | undefined;
        if (isAssetInfo(info)) {
          tokenInfo = tokenInfos.get(info.token.contract_addr);
          if (!tokenInfo) {
            const tokenResult: TokenResult | undefined =
              await factoryContract.getTokenInfo(info.token.contract_addr);
            tokenInfo = {
              symbol: "",
              name: "",
              contract_addr: info.token.contract_addr,
              decimals: 6,
              icon: "",
            };
            if (tokenResult) {
              tokenInfo = {
                symbol: tokenResult.symbol,
                name: tokenResult.name,
                contract_addr: info.token.contract_addr,
                decimals: tokenResult.decimals,
                icon: "",
              };
            }
            tokenInfos.set(info.token.contract_addr, tokenInfo);
          }
        } else if (isNativeInfo(info)) {
          tokenInfo = tokenInfos.get(info.native_token.denom);
        }
        return tokenInfo;
      };

      const fetchPairs = async () => {
        const res = await factoryContract.getLBPs();
        setIsLoading(false);
        const pairs = await Promise.all(
          res.map(async (pairResult: PairResult) => {
            try {
              const tokenInfo1 = await getTokenInfo(
                pairResult.asset_infos[0].info
              );
              const tokenInfo2 = await getTokenInfo(
                pairResult.asset_infos[1].info
              );
              if (tokenInfo1 === undefined || tokenInfo2 === undefined) {
                return;
              }

              let pair: Pair = {
                contract: pairResult.contract_addr,
                pair: [tokenInfo1, tokenInfo2],
                liquidity_token: pairResult.liquidity_token,
              };

              return pair;
            } catch (error) {
              console.log(error);
            }
            return undefined;
          })
        );

        if (pairs) {
          setResult({
            pairs: pairs.filter((pair) => !!pair) as Pair[],
          });
          setIsLoading(false);
        }
      };

      fetchPairs();
    } catch (e) {
      setIsLoading(false);
      console.log("Error: ", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.network]);

  return {
    isLoading,
    result,
    getPairInfo,
    fetchTokenInfo,
  };
}

export function isAssetInfo(object: any): object is AssetInfo {
  return "token" in object;
}

export function isNativeInfo(object: any): object is NativeInfo {
  return "native_token" in object;
}
