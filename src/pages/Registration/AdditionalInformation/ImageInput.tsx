import FileDropzone from "components/FileDropzone";
import { FieldError, useFormContext } from "react-hook-form";
import { InputRow } from "../common";
import { FormValues } from "./types";

type Props = {
  name: keyof FormValues;
  label: string;
};

export default function ImageInput({ name, label }: Props) {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  const inputErrors = errors[name] as FieldError[];

  // For some reason Yup doesn't set any error fields related to the array itself (judged by the type assumed
  // to be 'FieldError[] | undefined'), but only sets the fields of its items, so we have to convert it to 'any'
  const errorMessage = !!inputErrors?.length
    ? inputErrors[0]?.message
    : (errors[name] as FieldError)?.message;

  return (
    <InputRow id={name} label={label} required>
      <FileDropzone<FormValues>
        name={name}
        className="h-8"
        disabled={isSubmitting}
      />
      {errorMessage && (
        <p className="w-full text-xs text-failed-red text-center">
          {errorMessage}
        </p>
      )}
    </InputRow>
  );
}
