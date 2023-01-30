import { FieldValues } from "react-hook-form";
import { BaseInput, TextInputProps } from "components/form";
import { errorStyle } from "./constants";

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
        input: `w-full text-sm rounded placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-prim focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 bg-transparent disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1 ${input}`,
        error: `${errorStyle} ${error}`,
      }}
    />
  );
}
