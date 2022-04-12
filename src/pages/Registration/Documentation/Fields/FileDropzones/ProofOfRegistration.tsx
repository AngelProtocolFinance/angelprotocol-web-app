import FileDropzone from "components/FileDropzone";
import { FieldError, useFormContext } from "react-hook-form";
import { InputRow } from "../../../common";
import { FormValues } from "../../types";

export default function ProofOfRegistration() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  const inputErrors = errors.proofOfRegistration as FieldError[];

  // For some reason Yup doesn't set any error fields related to the array itself (judged by the type assumed
  // to be 'FieldError[] | undefined'), but only sets the fields of its items, so we have to convert it to 'any'
  const errorMessage = !!inputErrors?.length
    ? inputErrors[0]?.message
    : (errors.proofOfRegistration as FieldError)?.message;

  return (
    <InputRow
      htmlFor="proofOfRegistration"
      label="Proof of registration as a 501(c)(3) charity or equivalent"
      required
    >
      <FileDropzone<FormValues>
        name="proofOfRegistration"
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
