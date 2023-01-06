import { TokenWithAmount } from "types/slices";

export default function getBreakdown(token: TokenWithAmount) {
  const bill = +token.amount;
  const credit = token.gift || 0;

  return {
    fromBal: credit >= bill ? 0 : bill - credit,
    fromGift: credit - bill <= 0 ? credit : bill,
  };
}
