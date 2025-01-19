import { Form as RemixForm } from "@remix-run/react";
import {
  type ComponentProps,
  type FormHTMLAttributes,
  forwardRef,
} from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean;
}

export const Form = forwardRef<HTMLFormElement, IForm>(
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

export const RmxForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof RemixForm> & { disabled?: boolean }
>(({ disabled, children, ...props }, ref) => {
  return (
    <RemixForm ref={ref} {...props}>
      <fieldset disabled={disabled} className="contents">
        {children}
      </fieldset>
    </RemixForm>
  );
});

interface Props extends IForm {
  methods: UseFormReturn<any, any, any>;
}

export default forwardRef<HTMLFormElement, Props>(
  ({ methods, ...props }, ref) => {
    return (
      <FormProvider {...methods}>
        <Form {...props} ref={ref} />
      </FormProvider>
    );
  }
);
