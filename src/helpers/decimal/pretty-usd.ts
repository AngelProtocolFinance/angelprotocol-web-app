import Dec from "decimal.js";
import { toPreciseLocaleString } from "./utils";

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

const nextSuffix: { [suffix: string]: string } = {
  "": "K",
  K: "M",
  M: "B",
  B: "T",
};

function format(value: Dec.Value): [Dec, string] {
  const val = new Dec(value);

  if (val.abs().lt(1000)) {
    return [val.toDP(0, Dec.ROUND_HALF_UP), ""];
  }

  const [shortened, suffix] = shorten(new Dec(value));
  const dp = shortened.toDP(2, Dec.ROUND_HALF_UP);

  // shorten again and up the suffix
  if (dp.abs().gte(1000)) {
    return [shorten(dp)[0], nextSuffix[suffix]];
  }

  return [dp, suffix];
}

export function prettyUsd(value: Dec.Value): string {
  const [formatted, suffix] = format(value);
  return (
    toPreciseLocaleString(formatted.toNumber(), formatted.decimalPlaces()) +
    suffix
  );
}
