<<<<<<< HEAD
import { TokenWithBalance } from "services/terra/multicall/types";

export default function getTokenBalance(
  tokenBalances: TokenWithBalance[],
  denom: string
) {
  return tokenBalances.find((token) => token.min_denom === denom)?.balance || 0;
}

export function getToken(tokenBalances: TokenWithBalance[], denom: string) {
  return tokenBalances.find((token) => token.min_denom === denom) || {};
=======
import { denoms } from "constants/currency";
import { Coin } from "services/wallet/types";

export default function getTokenBalance(balances: Coin[], denom: denoms) {
  return balances.find((balance) => balance.denom === denom)?.amount || 0;
>>>>>>> master
}
