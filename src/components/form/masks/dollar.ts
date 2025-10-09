import { maskitoTransform } from "@maskito/core";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
export const opts = maskitoNumberOptionsGenerator({
  min: 0,
  prefix: "$ ",
  thousandSeparator: ",",
});

export function mask(num: number): string {
  return maskitoTransform(num.toString(), opts);
}

export function unmask(masked: string): string {
  return masked.replace("$ ", "").replace(/,/g, "");
}
