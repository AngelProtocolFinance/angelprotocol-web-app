import { WithBalance } from "services/types";

export default function getTokenBalance(
  tokenBalances: WithBalance[],
  symbol: string
): number {
  return tokenBalances.find((token) => token.symbol === symbol)?.balance || 0;
}
