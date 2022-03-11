import { PropsWithChildren } from "react";

export type InputRowProps = PropsWithChildren<{
  id?: string;
  label: string;
  required?: true | boolean;
}>;

export default function InputRow(props: InputRowProps) {
  const { id, label, required, children } = props;

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <label htmlFor={id} className="cursor-pointer">
        {label}
        {required && <span className="text-failed-red ml-0.5">*</span>}
      </label>
      <div className="flex flex-col gap-1 w-full">{children}</div>
    </div>
  );
}
