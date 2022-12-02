import { FieldValues } from "react-hook-form";
import { TextArea as BaseInput, TextAreaProps } from "components/form";

export function TextArea<T extends FieldValues>({
  classes,
  ...props
}: TextAreaProps<T>) {
  const { container = "", label = "", input = "", error = "" } = classes || {};
  return (
    <BaseInput
      {...props}
      classes={{
        container: `relative ${container}`,
        label: `mb-2 ${label}`,
        input: `w-full text-sm rounded placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7 disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1 ${input}`,
        error: `absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2 ${error}`,
      }}
    />
  );
}
