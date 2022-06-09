import { denoms } from "constants/currency";
import { Coin } from "services/wallet/types";

export default function getTokenBalance(balances: Coin[], denom: denoms) {
  return balances.find((balance) => balance.denom === denom)?.amount || 0;
}
