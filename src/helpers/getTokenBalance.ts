import { Token } from "types/server/aws";

export function getTokenBalance(
  tokenBalances: Token[],
  symbol: string
): number {
  return tokenBalances.find((token) => token.symbol === symbol)?.balance || 0;
}
