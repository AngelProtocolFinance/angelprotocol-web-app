import { FileObject } from "./aws";

//selector
export type ValKey = string | number;
export type OptionType<V> = { label: string; value: V };

//dropzone
export type Asset = {
  previews: FileObject[]; //from previous submission
  files: File[]; //new files
};

//country selector
export type Country = {
  name: string;
  flag: string;
  code: string;
};
