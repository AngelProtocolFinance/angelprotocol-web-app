import { Field, Input, Label } from "@headlessui/react";
import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface Props {
  classes?: string;
  input: ReactNode;
  label: string;
  error?: string;
  required?: boolean;
}

export function Field2({ classes = "", input, error, label, required }: Props) {
  return (
    <Field className={`${classes} group/field relative`}>
      {input}
      <Label data-required={required} className="label-floating">
        {label}{" "}
        {error && (
          <span
            data-error
            className="text-red mt-0.5 text-right text-xs font-normal"
          >
            {error}
          </span>
        )}
      </Label>
    </Field>
  );
}

export const Input2 = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> & {
    error?: string;
  }
>(({ className = "", ...props }, ref) => {
  return (
    <Input
      {...props}
      placeholder=""
      className="peer w-full py-3.5 text-sm rounded border border-gray-l3 px-4 transition-colors outline-(--accent-primary) group-[:has([data-error])]/field:border-red"
      ref={ref}
    />
  );
});
