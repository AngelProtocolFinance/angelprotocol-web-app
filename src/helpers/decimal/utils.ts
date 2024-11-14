import Dec, { Decimal } from "decimal.js";

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

export function shorten(num: Dec): [Dec, string] {
  if (num.abs().gte(1e9)) {
    return [num.div(1e9), "B"];
  }
  if (num.abs().gte(1e6)) {
    return [num.div(1e6), "M"];
  }
  if (num.abs().gte(1e3)) {
    return [num.div(1e3), "K"];
  }
  return [num, ""];
}
