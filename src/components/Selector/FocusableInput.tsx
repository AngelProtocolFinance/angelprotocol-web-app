import { forwardRef } from "react";

const FocusableInput = forwardRef<HTMLInputElement>(function Input(props, ref) {
  return (
    <input
      ref={ref}
      aria-hidden
      className="peer h-0 w-0 focus:outline-none absolute"
      tabIndex={-1}
    />
  );
});

export default FocusableInput;
