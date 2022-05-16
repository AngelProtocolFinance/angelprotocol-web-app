import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import FileDropzone from "components/FileDropzone";
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

  return (
    <InputRow htmlFor={name} label={label} required>
      <FileDropzone<FormValues>
        name={name}
        className="h-8"
        disabled={isSubmitting}
      />
      <ErrorMessage
        errors={errors}
        as="p"
        name={name}
        className="w-full text-xs text-failed-red text-center"
      />
    </InputRow>
  );
}
