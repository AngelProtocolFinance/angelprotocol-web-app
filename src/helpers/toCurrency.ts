export default function toCurrency(num?: number) {
  //set local to undefined to use user's default format
  if (!num) {
    return "xxx";
  } else {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  }
}
