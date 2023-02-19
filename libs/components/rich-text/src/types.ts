type ReadOnly = {
  readOnly: true;
  //map editable attr to never
} & Partial<{ [key in keyof Omit<Editable, "readOnly">]?: never }>;

export type Editable = {
  readOnly?: never;
  onChange(...event: any[]): void;
  onError(error: string): void;
  placeHolder?: string;
  charLimit?: number;
  disabled?: boolean;
};

export type EditorClasses = { container?: string; charCounter?: string };

export type Props = (ReadOnly | Editable) & {
  content: string;
  classes?: EditorClasses;
};
