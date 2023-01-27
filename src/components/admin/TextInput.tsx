import { FieldValues } from "react-hook-form";
import { TextInput as BaseInput, TextInputProps } from "components/form";

export const errorStyle =
  "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2";
export const textPrimStyle =
  "w-full text-sm rounded placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-prim focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 bg-orange-l6 dark:bg-blue-d7 disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1";

export function TextPrim<T extends FieldValues>({
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
        input: `${textPrimStyle} ${input}`,
        error: `${errorStyle} ${error}`,
      }}
    />
  );
}

export function TextSec<T extends FieldValues>({
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
        input: `w-full text-sm placeholder:text-gray-d1 dark:placeholder:text-gray border-b pb-2 border-prim focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2  bg-transparent disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1 ${input}`,
        error: `${errorStyle} ${error}`,
      }}
    />
  );
}
