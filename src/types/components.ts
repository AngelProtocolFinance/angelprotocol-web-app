import { FileObject } from "./aws";

//selector
export type ValKey = string | number;
export type OptionType<V> = { label: string; value: V };

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
