export default function toCurrency(num = 0, precision = 2) {
  //set local to undefined to use user's default format
  return num.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}
