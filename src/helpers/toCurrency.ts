export default function toCurrency(num = 0, precision = 2, truncate = false) {
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
