import { maskitoTransform } from "@maskito/core";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
export const dollarMaskOpts = maskitoNumberOptionsGenerator({
  min: 0,
  prefix: "$ ",
  thousandSeparator: ",",
});

export function mask(num: number): string {
  return maskitoTransform(num.toString(), dollarMaskOpts);
}

export function unmask(masked: string): number {
  const cleaned = masked.replace("$ ", "").replace(/,/g, "");
  if (!cleaned) return 0;
  return Number.parseFloat(cleaned);
}
