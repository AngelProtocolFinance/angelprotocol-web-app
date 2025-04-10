import { maskitoNumberOptionsGenerator } from "@maskito/kit";
export const dollarMaskOpts = maskitoNumberOptionsGenerator({
  min: 0,
  prefix: "$ ",
  thousandSeparator: ",",
});

export function unmask(masked: string) {
  const cleaned = masked.replace("$ ", "").replace(/,/g, "");
  if (!cleaned) return 0;
  return Number.parseFloat(cleaned);
}
