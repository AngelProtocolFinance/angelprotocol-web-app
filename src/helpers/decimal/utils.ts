import Dec, { Decimal } from "decimal.js";

/** wrapper of toLocalString, to use in tests to defined fraction digits*/
export function toPreciseLocaleString(num: number, precision: number) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

/** round down
 * @param precision - default: `2`
 */
export function rd(num: Dec.Value, precision = 2): string {
  return new Dec(num).toFixed(precision, Dec.ROUND_DOWN);
}

/** round down to num
 *  @param precision - default: `2`
 *
 */
export function rd2num(num: Dec.Value, precision = 2): number {
  return +rd(num, precision);
}

/** convert numbers to user's number format with precision defined
 * @param precision - default: `2`
 * @param truncate - default: `false`, whether to shorten large numbers (e.g. 1,200 -> 1.2K)
 *
 */
export function humanize(num: Dec.Value, precision = 2, truncate = false) {
  const _num = new Dec(num);
  const [truncated, suffix] = truncate ? shorten(_num) : [_num, ""];
  //set local to undefined to use user's default format
  return (
    toPreciseLocaleString(rd2num(truncated, precision), precision) + suffix
  );
}

/** appropriate number of decimals depending on usd value
 *  e.g. (1usd -> 1usd), 100 cents per usd -> 2 decimals
 *  e.g. (100,000usd -> 1btc), 10,000,000 cents per btc -> 6 decimals
 *  @param max_decimals - default: `2`
 */
export function vdec(usd_per_unit: number | number, max_decimals = 2) {
  //get `x` such that (10^x)cents = rate
  const x = Dec.log10(new Decimal(usd_per_unit).div(0.01));
  // make sure display digits is less than token decimals
  return Dec.min(max_decimals, Dec.max(x, 0)).floor().toNumber();
}

export const usdpu = (amount: number, usd_value: number) => {
  return amount > 0 ? usd_value / amount : 0;
};

/** round up to approriate number of decimals depending on value
 *  @param max_decimals - default: `2`
 *
 */
export function ru_vdec(
  amount: number | string,
  usd_per_unit: number,
  max_decimals = 2
) {
  return new Dec(amount).toFixed(
    vdec(usd_per_unit, max_decimals),
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
