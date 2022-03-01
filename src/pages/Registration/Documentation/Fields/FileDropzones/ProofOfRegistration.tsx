import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import InputRow from "../InputRow";

export default function ProofOfRegistration() {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="proofOfRegistration"
      label="Proof of registration as a 501(c)(3) charity or equivalent"
      required
    >
      <FileDropzone name="proofOfRegistration" className="h-8" />
      {errors.proofOfRegistration?.message && (
        <p className="w-full text-xs text-failed-red text-center">
          {errors.proofOfRegistration.message}
        </p>
      )}
    </InputRow>
  );
}
