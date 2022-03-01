import FileDropzone from "components/FileDropzone";
import { useSetModal } from "components/Modal/Modal";
import { useFormContext } from "react-hook-form";
import { BsX } from "react-icons/bs";
import Button from "../../../Button";
import { FormValues } from "../../types";
import InputRow from "../InputRow";

export default function ProofOfIdentity() {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="proofOfIdentity"
      label="Your proof of identity"
      infoModal={ProofOfIdentityModal}
      required
    >
      <FileDropzone name="proofOfIdentity" className="h-8" />
      {errors.proofOfIdentity?.message && (
        <p className="w-full text-xs text-failed-red text-center">
          {errors.proofOfIdentity.message}
        </p>
      )}
    </InputRow>
  );
}

function ProofOfIdentityModal() {
  const { hideModal } = useSetModal();

  return (
    <div className="bg-white-grey max-w-sm p-3 pb-5 rounded-xl shadow-lg text-center text-thin-blue">
      <BsX
        className="text-gray-300 text-2xl ml-auto hover:cursor-pointer"
        onClick={hideModal}
      />
      <p className="p-4">
        ### EXPLANATION FOR REASONS FOR ASKING PROOF OF IDENTITY AND ACCEPTABLE
        TYPES ###
      </p>
      <Button className="bg-thin-blue w-40 h-10" onClick={hideModal}>
        Got it
      </Button>
    </div>
  );
}
