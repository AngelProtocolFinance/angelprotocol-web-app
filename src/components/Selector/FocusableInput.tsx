import { forwardRef } from "react";

const FocusableInput = forwardRef<HTMLInputElement>(
  function Input(_props, ref) {
    return (
      <input ref={ref} aria-hidden className="h-0 w-0 absolute" tabIndex={-1} />
    );
  },
);

export default FocusableInput;
