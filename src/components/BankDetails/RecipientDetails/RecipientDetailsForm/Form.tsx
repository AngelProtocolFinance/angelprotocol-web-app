import type { FormHTMLAttributes } from "react";

export default function Form({
  isSubmitting,
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement> & { isSubmitting: boolean }) {
  return (
    <form {...props}>
      <fieldset className="contents" disabled={isSubmitting}>
        {children}
      </fieldset>
    </form>
  );
}
