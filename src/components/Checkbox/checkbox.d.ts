declare module "@types-component/checkbox" {
  import { InputHTMLAttributes, PropsWithChildren } from "react";
  type CheckboxProps = PropsWithChildren<
    InputHTMLAttributes<HTMLInputElement> & {
      error?: string;
      centerError?: true | boolean;
    }
  >;
}
