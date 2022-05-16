import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
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

  return (
    <InputRow htmlFor={name} label={label} required>
      <FileDropzone<AdditionalInfoValues>
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
