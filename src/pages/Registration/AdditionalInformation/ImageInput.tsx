import { FieldError, useFormContext } from "react-hook-form";
import { AdditionalInfoValues } from "@types-page/registration";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../common";

type Props = {
  name: keyof AdditionalInfoValues;
  label: string;
};

export default function ImageInput({ name, label }: Props) {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<AdditionalInfoValues>();

  const errorMessage = (errors[name] as FieldError)?.message;

  return (
    <InputRow htmlFor={name} label={label} required>
      <FileDropzone<AdditionalInfoValues>
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
