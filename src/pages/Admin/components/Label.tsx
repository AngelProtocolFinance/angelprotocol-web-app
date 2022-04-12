import React from "react";
export default function Label(
  props: React.HTMLProps<HTMLParagraphElement> & {
    _required?: true;
  }
) {
  const {
    children,
    //default font color
    className = "text-angel-grey",
    _required,
    ...restProps
  } = props;
  return (
    <p
      {...restProps}
      className={`flex items-baseline gap-1 text-xs font-heading uppercase font-bold ${className}`}
    >
      {children} {_required && <span className="text-red-400">*</span>}
    </p>
  );
}
