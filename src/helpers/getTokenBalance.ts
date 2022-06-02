import { WithBalance } from "services/types";

export default function getTokenBalance(
  tokenBalances: WithBalance[],
  symbol: string
): number {
  return tokenBalances.find((token) => token.symbol === symbol)?.balance || 0;
}

export function getToken(tokenBalances: WithBalance[], symbol: string) {
  return tokenBalances.find((token) => token.symbol === symbol) || {};
}
