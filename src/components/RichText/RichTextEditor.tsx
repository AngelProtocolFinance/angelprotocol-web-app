import { ErrorMessage } from "@hookform/error-message";
import "quill/dist/quill.bubble.css";
import {
  FieldValues,
  Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { Editable, EditorClasses } from "./types";
import RichText from "./RichText";

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

  const invalid = !!get(errors, props.fieldName);

  return (
    <>
      <RichText
        content={value}
        onChange={onChange}
        placeHolder={props.placeHolder}
        charLimit={props.charLimit}
        classes={props.classes}
        disabled={isSubmitting}
        invalid={invalid}
      />
      <ErrorMessage
        errors={errors}
        name={props.fieldName as any}
        as="p"
        className={props.classes?.error}
      />
    </>
  );
}
