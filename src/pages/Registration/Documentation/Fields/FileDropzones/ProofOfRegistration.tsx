import { FieldError, useFormContext } from "react-hook-form";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../../../common";
import { FormValues } from "../../types";

export default function ProofOfRegistration() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  const errorMessage = (errors.proofOfRegistration as FieldError)?.message;

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
