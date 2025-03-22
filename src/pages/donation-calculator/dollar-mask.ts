import { maskitoNumberOptionsGenerator } from "@maskito/kit";
export const dollarMaskOpts = maskitoNumberOptionsGenerator({
  min: 0,
  prefix: "$ ",
  thousandSeparator: ",",
});

export function unmask(masked: string) {
  if (!masked) return 0;
  const cleaned = masked.replace("$ ", "").replace(/,/g, "");
  return Number.parseFloat(cleaned);
}
