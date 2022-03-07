import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import InputRow from "../InputRow";

export default function ProofOfRegistration() {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  // For some reason Yup doesn't set any error fields related to the array itself (judged by the type assumed
  // to be 'FieldError[] | undefined'), but only sets the fields of its items, so we have to convert it to 'any'
  const errorMessage = !!errors?.proofOfRegistration?.length
    ? errors.proofOfRegistration[0].message
    : (errors?.proofOfRegistration as any)?.message;

  return (
    <InputRow
      id="proofOfRegistration"
      label="Proof of registration as a 501(c)(3) charity or equivalent"
      required
    >
      <FileDropzone name="proofOfRegistration" className="h-8" />
      {errorMessage && (
        <p className="w-full text-xs text-failed-red text-center">
          {errorMessage}
        </p>
      )}
    </InputRow>
  );
}
