import React, { MouseEventHandler, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  bgColor: string;
  onClick?: MouseEventHandler | undefined;
}>;

export default function Button({ bgColor, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} uppercase text-white text-sm w-48 py-2 rounded-lg font-semibold shadow-md`}
    >
      {children}
    </button>
  );
}
