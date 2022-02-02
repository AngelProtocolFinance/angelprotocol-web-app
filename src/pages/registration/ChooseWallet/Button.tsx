import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function Button(props: Props) {
  const { children, className, ...buttonProps } = props;

  return (
    <button
      className={`flex gap-3 h-12 w-full justify-center items-center rounded-sm bg-white hover:bg-light-grey ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
