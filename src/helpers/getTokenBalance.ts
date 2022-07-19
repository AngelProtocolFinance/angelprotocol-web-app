import { Token } from "types/server/aws";

export default function getTokenBalance(
  tokenBalances: Token[],
  symbol: string
): number {
  return tokenBalances.find((token) => token.symbol === symbol)?.balance || 0;
}
