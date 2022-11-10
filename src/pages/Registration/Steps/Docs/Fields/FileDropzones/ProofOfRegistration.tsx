import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../../../../common";

export default function ProofOfRegistration() {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      htmlFor="proofOfRegistration"
      label="Proof of registration as a 501(c)(3) charity or equivalent"
      required
    >
      <FileDropzone<FormValues, "proofOfRegistration">
        name="proofOfRegistration"
        className="h-8"
        disabled={isSubmitting}
      />
    </InputRow>
  );
}
