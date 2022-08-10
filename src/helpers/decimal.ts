import Dec from "decimal.js";

const DEFAULT_DECIMAL = 6;

export function condense(
  scaled: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return new Dec(scaled).div(new Dec(10).pow(decimals));
}

export function condenseToNum(scaled: Dec.Value) {
  return condense(scaled).toNumber();
}
export function condenseToStr(scaled: Dec.Value) {
  return condense(scaled).toString();
}

export function scale(
  condensed: Dec.Value,
  decimals: number = DEFAULT_DECIMAL
) {
  return new Dec(condensed).mul(new Dec(10).pow(decimals));
}

export function scaleToStr(condensed: Dec.Value) {
  return scale(condensed).divToInt(1).toString();
}

export function toCurrency(num: Dec.Value, precision = 2, truncate = false) {
  let _num = new Dec(num);
  const [truncated, suffix] = truncate ? shorten(_num) : [_num, ""];
  //set local to undefined to use user's default format
  return (
    roundDownToNum(truncated).toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }) + suffix
  );
}

export function roundDown(num: Dec.Value, precision = 2) {
  return new Dec(num).toFixed(precision, Dec.ROUND_DOWN);
}

export function roundDownToNum(num: Dec.Value, precision = 2) {
  return +new Dec(num).toFixed(precision, Dec.ROUND_DOWN);
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
