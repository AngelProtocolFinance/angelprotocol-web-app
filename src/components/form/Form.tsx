import { FormHTMLAttributes, forwardRef } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

type Props = FormHTMLAttributes<HTMLFormElement> & {
  methods?: UseFormReturn<any, any, any>;
  disabled?: boolean;
};
export default forwardRef<HTMLFormElement, Props>(function Form(
  { methods, disabled, children, ...props },
  ref
) {
  const form = (
    <form ref={ref} {...props}>
      {disabled ? (
        <fieldset disabled={disabled}>{children}</fieldset>
      ) : (
        children
      )}
    </form>
  );

  if (!methods) return form;

  return <FormProvider {...methods}>{form}</FormProvider>;
});
