import React from "react";

export function Label(
  props: React.HTMLProps<HTMLParagraphElement> & {
    _required?: true;
  }
) {
  const {
    children,
    //default font color
    className = "text-gray-d2",
    _required,
    ...restProps
  } = props;
  return (
    <p
      {...restProps}
      className={`flex items-baseline gap-1 text-xs font-heading uppercase font-bold ${className}`}
    >
      {children} {_required && <span className="text-red-l1">*</span>}
    </p>
  );
}
