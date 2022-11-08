import { FieldValues } from "react-hook-form";
import { TextInput as BaseInput, TextInputProps } from "components/form";

export const errorStyle =
  "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2";

export const textFieldStyle =
  "w-full rounded placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray bg-gray-l5 dark:bg-blue-d6";

export default function TextInput<T extends FieldValues>(
  props: TextInputProps<T>
) {
  return (
    <BaseInput
      {...props}
      base={{
        container: "relative",
        label: "mb-2",
        input: textFieldStyle,
        error: errorStyle,
      }}
    />
  );
}
