//token selector
import type { Token } from "@better-giving/assets/tokens";
import type { FileObject } from "./aws";
import type { DonateMethodId } from "./lists";
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

export type TDonateMethod = {
  id: DonateMethodId;
  name: string;
  disabled: boolean;
  locked?: boolean;
  tooltip?: string;
};
