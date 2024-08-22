import Dec, { Decimal } from "decimal.js";

/** in most cosmos chains scale
 * 1 user amount = 1_000_000 or 10^(6) transaction amount
 * e.g *sending 1atom
 * const userAmount = 1; //atom
 * sendMsg = new MsgSend(userAmount * 10^6) //send 1_000_000 uatom
 */
const DEFAULT_DECIMAL = 6;

/**
 * use this function to convert transaction amount e.g 1_000_000uatom
 * to user amount e.g 1atom
 * and do further operations with it:
 * condense(uamount).mul(1.16)
 */
export function condense(
  scaled: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return new Dec(scaled).div(new Dec(10).pow(decimals));
}

/**
 * condensing to final number amount (no further operations)
 * e.g getting balance
 * format(condense(uAtomBalance))
 */
export function condenseToNum(
  scaled: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return condense(scaled, decimals).toNumber();
}

/**
 * condensing to final string amount (no further operations)
 * e.g getting balance
 * format(condense(uAtomBalance))
 */
export function condenseToStr(
  scaled: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return condense(scaled, decimals).toString();
}

/**
 * use this function to convert user amount e.g 1atom
 * to user amount e.g 1_000_000 uatom
 * and do further operations with it:
 * e.g uhalo.balance.sub(scale(halo_amount)) -- both in uhalo
 */
export function scale(
  condensed: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return new Dec(condensed).mul(new Dec(10).pow(decimals));
}

/**
 * scale to final string amount (no further operations)
 * e.g sending funds
 * uAtomToSend = scale(1atom)
 */
export function scaleToStr(
  condensed: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return scale(condensed, decimals)
    .divToInt(1) /** we always convert to int e.g '1.23456789 atom' 
     scaled to ^6 should be 123456uatom(atomic amount) not 123456.789 */
    .toString();
}

/** convert numbers to user's number format with precision defined */
export function humanize(num: Dec.Value, precision = 2, truncate = false) {
  let _num = new Dec(num);
  const [truncated, suffix] = truncate ? shorten(_num) : [_num, ""];
  //set local to undefined to use user's default format
  return (
    toPreciseLocaleString(roundDownToNum(truncated, precision), precision) +
    suffix
  );
}

/** wrapper of toLocalString, to use in tests to defined fraction digits*/
export function toPreciseLocaleString(num: number, precision: number) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export function roundDown(num: Dec.Value, precision = 2) {
  return new Dec(num).toFixed(precision, Dec.ROUND_DOWN);
}

export function roundDownToNum(num: Dec.Value, precision = 2) {
  return +roundDown(num, precision);
}

export function centsDecimals(usdValue: number, decimals = 2) {
  //get `x` such that (10^x)cents = rate
  const x = Dec.log10(new Decimal(usdValue).div(0.01));
  // make sure display digits is less than token decimals
  return Dec.min(decimals, Dec.max(x, 0)).floor().toNumber();
}

export function roundToCents(amount: number, usdValue: number, decimals = 2) {
  return new Dec(amount).toFixed(
    centsDecimals(usdValue, decimals),
    Dec.ROUND_UP
  );
}

function shorten(num: Dec): [Dec, string] {
  if (num.gt(1e9)) {
    return [num.div(1e9), "B"];
  } else if (num.gt(1e6)) {
    return [num.div(1e6), "M"];
  } else if (num.gt(1e3)) {
    return [num.div(1e3), "K"];
  }
  return [num, ""];
}
