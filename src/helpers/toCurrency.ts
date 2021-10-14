export default function toCurrency(num = 0) {
  //set local to undefined to use user's default format

  return num.toLocaleString(undefined, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}
