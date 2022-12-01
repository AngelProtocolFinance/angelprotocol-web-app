import { FieldValues } from "react-hook-form";
import { TextInput as BaseInput, TextInputProps } from "components/form";

export const textFieldStyle =
  "w-full text-sm rounded placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray bg-orange-l6 dark:bg-blue-d6 disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1";

export const errorStyle =
  "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2 ";

export function TextInput<T extends FieldValues>({
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
