import type { Token } from "@better-giving/assets/tokens";
//token selector
import * as v from "valibot";
import type { FileObject } from "./aws";
import { donateMethodId } from "./lists";
export { type Token as TokenV2 } from "@better-giving/assets/tokens";

export interface TokenWithDetails extends Token {
  amount: string;
  min: number;
  /** usd/unit */
  rate: number;
}
//selector
export type ValKey = string | number;
export type OptionType<V extends ValKey> = { label: string; value: V };

//dropzone
export type FileDropzoneAsset = {
  previews: FileObject[]; //from previous submission
  files: File[]; //new files
};

//country selector
export type Country = {
  name: string;
  flag: string;
  code: string;
};

//currency selector

type BaseCurrency = {
  name?: string;
  code: string;
};

export type DetailedCurrency = BaseCurrency & {
  /** unit/usd */
  rate: number;
  min: number;
};

export type Currency = BaseCurrency & {
  min?: number;
  /** unit/usd */
  rate: number | null;
};

export type CurrencyOption = Currency | DetailedCurrency;
/**
 * Rich text strings contain not only the user input itself, but is a
 * stringified object that describes the styling of particular parts of
 * the text (bolding, italics, lists etc.), which complicates getting the
 * plain character length for checking whether the user has passed the max
 * char. threshold.
 * In order to avoid having to extract and calculate the plain text characters
 * after they have been included in the rich text string, we save the character
 * length as the text is being typed as a separate parameter and use *it* for
 * any validation necessary.
 */
export type RichTextContent = {
  value: string;
  /**
   * Optional because we don't set the length manually, it is calculated
   * by the RichText component itself and updated on every change.
   */
  length?: number;
};

/** query loader */
export interface QueryState<T> {
  error?: unknown;
  data?: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

/** query loader */
export function isQuery<T>(val: T | QueryState<T>): val is QueryState<T> {
  return "isLoading" in (val as any) && "isFetching" in (val as any);
}

export const donateMethod = v.object({
  id: donateMethodId,
  name: v.string(),
  disabled: v.boolean(),
  locked: v.optional(v.boolean()),
  tooltip: v.optional(v.string()),
});

export type TDonateMethod = v.InferOutput<typeof donateMethod>;
