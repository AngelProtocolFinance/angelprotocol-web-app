import { Dec } from "@terra-money/terra.js";

export function formatUSD(amount: any) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
}

export function formatTokenAmount(amount: number, decimals: number) {
  console.log("dec: ", amount, decimals);
  const tokens = Dec.withPrec(amount, decimals);
  const formatter = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: String(amount).length,
  });
  const parts = formatter.formatToParts(parseFloat(tokens.toString()));

  if (parts[parts.length - 1].type === "fraction") {
    parts[parts.length - 1].value = tokens.toFixed(decimals).split(".")[1];
  }

  return parts.map((part) => part.value).join("");
}
