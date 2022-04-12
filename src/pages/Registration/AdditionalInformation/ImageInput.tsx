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

  const errorMessage = (errors[name] as FieldError)?.message;

  return (
    <InputRow htmlFor={name} label={label} required>
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
