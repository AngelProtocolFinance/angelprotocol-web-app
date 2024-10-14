import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { RichText } from "./RichText";
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
    field: { value, onChange, ref },
  } = useController<T>({ name: props.fieldName });

  return (
    <RichText
      ref={ref}
      content={value}
      onChange={onChange}
      placeHolder={props.placeHolder}
      charLimit={props.charLimit}
      classes={props.classes}
      disabled={isSubmitting}
      //NOTE: only valid if scoped to rhf context + yup schema
      error={get(errors, props.fieldName)?.message}
    />
  );
}
