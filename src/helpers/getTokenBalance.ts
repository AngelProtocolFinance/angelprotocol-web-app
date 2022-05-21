import { TokenWithBalance } from "services/types";

export default function getTokenBalance(
  tokenBalances: TokenWithBalance[],
  denom: string
) {
  return tokenBalances.find((token) => token.min_denom === denom)?.balance || 0;
}

export function getToken(tokenBalances: TokenWithBalance[], denom: string) {
  return tokenBalances.find((token) => token.min_denom === denom) || {};
}
