import { FieldValues } from "react-hook-form";
import { BaseInput, TextInputProps } from "components/form";

export const errorStyle =
  "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2";

export const textFieldStyle =
  "w-full rounded placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-prim focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 bg-gray-l5 dark:bg-blue-d6";

export default function TextInput<T extends FieldValues>({
  classes,
  ...props
}: TextInputProps<T>) {
  const { container = "", label = "", input = "", error = "" } = classes || {};
  return (
    <BaseInput
      {...props}
      classes={{
        container: `relative ${container}`,
        label: `mb-2 ${label}`,
        input: `${textFieldStyle} ${input}`,
        error: `${errorStyle} ${error}`,
      }}
    />
  );
}
