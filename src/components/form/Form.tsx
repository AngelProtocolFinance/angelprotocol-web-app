import { type FormHTMLAttributes, forwardRef } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";

type El = HTMLFormElement;

interface IForm extends FormHTMLAttributes<El> {
  disabled?: boolean;
}

export const Form = forwardRef<El, IForm>(
  ({ disabled, children, ...props }, ref) => {
    return (
      <form ref={ref} {...props}>
        <fieldset disabled={disabled} className="contents">
          {children}
        </fieldset>
      </form>
    );
  }
);

interface Props extends IForm {
  methods: UseFormReturn<any, any, any>;
}

export default forwardRef<El, Props>(({ methods, ...props }, ref) => {
  return (
    <FormProvider {...methods}>
      <Form {...props} ref={ref} />
    </FormProvider>
  );
});
