import { NativeTokenWithBalance } from "contexts/WalletContext/types";

export default function getTokenBalance(
  tokenBalances: NativeTokenWithBalance[],
  denom: string
) {
  const balance =
    tokenBalances.find((token) => token.min_denom === denom)?.balance || "0";
  return +balance;
}

export function getToken(
  tokenBalances: NativeTokenWithBalance[],
  denom: string
) {
  return tokenBalances.find((token) => token.min_denom === denom) || {};
}
