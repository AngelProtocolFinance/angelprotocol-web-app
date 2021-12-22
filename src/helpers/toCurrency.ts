export default function toCurrency(num = 0, precision = 2, truncate = false) {
  num = decimalAdjust(num, -precision);
  const [truncated, suffix] = truncate ? truncator(num) : [num, ""];
  //set local to undefined to use user's default format
  return (
    truncated.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }) + suffix
  );
}

function truncator(num: number): [number, string] {
  let truncated = num;
  let suffix = "";

  if (num > 1e9) {
    truncated /= 1e9;
    suffix = "B";
  } else if (num > 1e6) {
    truncated /= 1e6;
    suffix = "M";
  } else if (num > 1e3) {
    truncated /= 1e3;
    suffix = "K";
  }
  return [truncated, suffix];
}

/**
 * Decimal adjustment of a number.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(value: number, exp: number) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math.floor(value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  let splitValue = value.toString().split("e");
  value = Math.floor(
    +(splitValue[0] + "e" + (splitValue[1] ? +splitValue[1] - exp : -exp))
  );
  // Shift back
  splitValue = value.toString().split("e");
  return +(splitValue[0] + "e" + (splitValue[1] ? +splitValue[1] + exp : exp));
}
