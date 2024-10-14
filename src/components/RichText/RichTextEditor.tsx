import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import RichText from "./RichText";
import type { Editable, EditorClasses } from "./types";

export function RichTextEditor<T extends FieldValues>(
  props: {
    fieldName: Path<T>;
    classes?: EditorClasses & { error?: string };
  } & Pick<Editable, "charLimit" | "placeHolder">
) {
  const {
    formState: { isSubmitting },
  } = useFormContext<T>();
  const {
    formState: { errors },
    field: { value, onChange },
  } = useController<T>({ name: props.fieldName });

  return (
    <RichText
      content={value}
      onChange={onChange}
      placeHolder={props.placeHolder}
      charLimit={props.charLimit}
      classes={props.classes}
      disabled={isSubmitting}
      error={
        get(errors, `${props.fieldName}.value`)?.message ||
        get(errors, `${props.fieldName}.length`)?.message
      }
    />
  );
}
