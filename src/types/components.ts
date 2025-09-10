import type { Token } from "@better-giving/assets/tokens";
import { donate_method_id } from "@better-giving/endowment/schema";
//token selector
import * as v from "valibot";

import type { DBCurrency } from "types/currency";

export interface TokenWithDetails extends Token {
  amount: string;
  min: number;
  /** usd/unit */
  rate: number;
}
//selector
export type ValKey = string | number;
export type OptionType<V extends ValKey> = { label: string; value: V };

export const wise_currency_option = v.object({
  code: v.string(),
  name: v.string(),
  rate: v.null(),
});

export interface WiseCurrencyOption
  extends v.InferOutput<typeof wise_currency_option> {}

export type CurrencyOption =
  | DBCurrency
  | { name: string; code: string; rate: null };
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
interface RichTextContentOptions {
  maxChars?: number;
  required?: boolean;
}
export const richTextContent = ({
  maxChars = Number.MAX_SAFE_INTEGER,
  required = false,
}: RichTextContentOptions) => {
  return v.object({
    value: required
      ? v.pipe(v.string("required"), v.nonEmpty("required"))
      : v.string("dev:set default value to empty"),
    length: v.optional(
      v.pipe(
        v.number(),
        v.maxValue(maxChars, ({ requirement: r }) => `max length is ${r} chars`)
      )
    ),
  });
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
export type RichTextContent = v.InferOutput<ReturnType<typeof richTextContent>>;

export const donateMethod = v.object({
  id: donate_method_id,
  name: v.string(),
  disabled: v.boolean(),
  locked: v.optional(v.boolean()),
  tooltip: v.optional(v.string()),
});

export type TDonateMethod = v.InferOutput<typeof donateMethod>;

//re-exports
export type { Token as TokenV2 } from "@better-giving/assets/tokens";
export type { DBCurrency } from "types/currency";

export interface IPaginator<T> {
  items: T[];
  load_next?: () => void;
  loading?: boolean;
  disabled?: boolean;
  classes?: string;
}
