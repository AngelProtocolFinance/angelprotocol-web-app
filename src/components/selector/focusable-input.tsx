import { forwardRef } from "react";

export const FocusableInput = forwardRef<HTMLInputElement>(
  function Input(_props, ref) {
    return (
      <input ref={ref} aria-hidden className="h-0 w-0 absolute" tabIndex={-1} />
    );
  }
);
