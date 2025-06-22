import { maskitoTransform } from "@maskito/core";
import {
  maskitoNumberOptionsGenerator,
  maskitoParseNumber,
} from "@maskito/kit";

export const currency_mask_opts = maskitoNumberOptionsGenerator({
  min: 0,
  thousandSeparator: ",",
  precision: 2,
});

export function mask(num: string): string {
  return maskitoTransform(num.toString(), currency_mask_opts);
}

export function unmask(masked: string): string {
  if (!masked) return "";
  return maskitoParseNumber(masked).toString();
}
