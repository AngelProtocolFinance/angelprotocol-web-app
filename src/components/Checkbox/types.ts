import { InputHTMLAttributes, PropsWithChildren } from "react";

export type CheckboxProps = PropsWithChildren<
  InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    centerError?: true | boolean;
  }
>;
