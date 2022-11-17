import { PropsWithChildren } from "react";

export type InputProps = PropsWithChildren<{
  classes?: string;
  htmlFor?: string;
  label: string;
  required?: true | boolean;
  infoModal?: React.FC<{}>;
}>;
