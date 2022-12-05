type ReadOnly = {
  readOnly: true;
  onChange?(...event: any[]): never;

  onError?: never;
  placeHolder?: never;
  charLimit?: never;
};

export type Editable = {
  readOnly?: never;
  onChange(...event: any[]): void;
  onError(error: string): void;
  placeHolder?: string;
  charLimit?: number;
};

export type EditorClasses = { container?: string; charCounter?: string };

export type Props = (ReadOnly | Editable) & {
  content: string;
  classes?: EditorClasses;
};
