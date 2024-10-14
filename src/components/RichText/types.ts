import type { RichTextContent } from "types/components";

type ReadOnly = {
  readOnly: true;
  //map editable attr to never
} & Partial<{ [key in keyof Omit<Editable, "readOnly">]?: never }>;

export type Editable = {
  readOnly?: never;
  onChange(content: Required<RichTextContent>): void;
  placeHolder?: string;
  charLimit?: number;
  disabled?: boolean;
  error?: string;
};

export type EditorClasses = {
  container?: string;
  field?: string;
  counter?: string;
  error?: string;
};

export type Props = (ReadOnly | Editable) & {
  content: RichTextContent;
  classes?: EditorClasses;
};
