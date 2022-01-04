import React, { MouseEventHandler, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  className: string;
  onClick?: MouseEventHandler | undefined;
}>;

export default function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} uppercase text-white text-sm w-48 py-2 rounded-lg font-semibold shadow-md`}
    >
      {children}
    </button>
  );
}
