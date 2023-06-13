import { FC, PropsWithChildren } from "react";

export const Form: FC<
  PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>
> = ({ children, className, ...props }) => (
  <form
    className={`${className} grid content-start gap-6 @lg:gap-8 p-4 @lg:p-8 border border-prim rounded dark:bg-blue-d6`}
    {...props}
  >
    {children}
  </form>
);
