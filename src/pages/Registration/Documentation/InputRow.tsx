import { PropsWithChildren } from "react";

export type InputRowProps = PropsWithChildren<{
  id?: string;
  label: string;
  error?: string;
  required?: true | boolean;
}>;

export default function InputRow(props: InputRowProps) {
  const { id, label, error, required, children } = props;

  return (
    <div className="grid grid-cols-2 items-center">
      <label htmlFor={id}>
        {label}
        {required && <span className="text-failed-red ml-0.5">*</span>}
      </label>
      <div className="flex flex-col gap-1 w-full items-center relative">
        {children}
        {error && (
          <p className="absolute left-0 -bottom-4 w-full text-center text-xs text-failed-red">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
