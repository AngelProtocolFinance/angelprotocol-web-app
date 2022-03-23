import React from "react";
export default function Label(
  props: React.HTMLProps<HTMLParagraphElement> & {
    _textColor?: string;
    _classes?: string;
    _required?: true;
  }
) {
  const { children, _classes, _required, ...restProps } = props;
  return (
    <p
      {...restProps}
      className={`mb-2 text-xs font-heading uppercase font-bold ${
        _classes || "text-angel-grey"
      }`}
    >
      {children} {_required && <span className="text-red-400">*</span>}
    </p>
  );
}
