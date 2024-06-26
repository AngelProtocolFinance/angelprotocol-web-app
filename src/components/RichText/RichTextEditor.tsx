import { ErrorMessage } from "@hookform/error-message";
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
    setValue,
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
        onInit={(v) =>
          setValue(props.fieldName, v as any, { shouldDirty: false })
        }
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
