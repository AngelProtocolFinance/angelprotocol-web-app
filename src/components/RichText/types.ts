import { RichTextContent } from "types/components";

type ReadOnly = {
  readOnly: true;
  //map editable attr to never
} & Partial<{ [key in keyof Omit<Editable, "readOnly">]?: never }>;

export type Editable = {
  readOnly?: never;
  onChange(content: Required<RichTextContent>): void;
  onError(error: string): void;
  placeHolder?: string;
  charLimit?: number;
  disabled?: boolean;
  invalid?: boolean;
};

export type EditorClasses = { container?: string; charCounter?: string };

export type Props = (ReadOnly | Editable) & {
  content: RichTextContent;
  classes?: EditorClasses;
};
