import { useEffect, useState } from "react";
import { useGetTerraTokensQuery } from "services/apes/currencies";
import { Providers } from "services/provider/types";
import { useGetter } from "store/accessors";
import {
  Token,
  denoms,
  supported_bnb_tokens,
  supported_eth_tokens,
} from "constants/currency";

export default function useGetTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [nativeDenom, setNativeDenom] = useState<denoms>(denoms.uusd);
  const { data: terraTokens = [], isLoading } = useGetTerraTokensQuery("");
  const { active: activeProvider } = useGetter((state) => state.provider);
  const isTerra = activeProvider === Providers.terra;

  useEffect(() => {
    if (activeProvider === Providers.terra) {
      setTokens(terraTokens);
      setNativeDenom(denoms.uusd);
    } else if (activeProvider === Providers.binance) {
      setTokens(supported_bnb_tokens);
      setNativeDenom(denoms.bnb);
    } else if (activeProvider === Providers.ethereum) {
      setTokens(supported_eth_tokens);
      setNativeDenom(denoms.ether);
    } else {
      setTokens([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider, terraTokens]);
  return {
    nativeDenom,
    data: tokens,
    isLoading: isTerra ? isLoading : false,
  };
}
