import { TokenWithAmount } from "types/slices";

export default function getBreakdown(token: TokenWithAmount) {
  const bill = +token.amount;
  const credit = token.gift || 0;
  const toDeduct = credit - bill;

  return {
    fromBal: credit > bill ? 0 : Math.abs(toDeduct),
    fromGift: toDeduct <= 0 ? credit : bill,
  };
}
