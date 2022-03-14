import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { InputRow } from "../common";
import { FormValues } from "./types";

export default function LogoInput() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  // For some reason Yup doesn't set any error fields related to the array itself (judged by the type assumed
  // to be 'FieldError[] | undefined'), but only sets the fields of its items, so we have to convert it to 'any'
  const errorMessage = !!errors?.charityLogo?.length
    ? errors.charityLogo[0].message
    : (errors?.charityLogo as any)?.message;

  return (
    <InputRow id="charityLogo" label="Logo of your organization" required>
      <FileDropzone<FormValues>
        name="charityLogo"
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
