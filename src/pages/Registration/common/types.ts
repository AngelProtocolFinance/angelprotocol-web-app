import { PropsWithChildren } from "react";

export type InputProps = PropsWithChildren<{
  htmlFor?: string;
  label: string;
  required?: true | boolean;
  infoModal?: React.FC<{}>;
}>;
