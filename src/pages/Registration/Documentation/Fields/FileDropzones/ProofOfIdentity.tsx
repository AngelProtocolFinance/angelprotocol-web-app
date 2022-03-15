import FileDropzone from "components/FileDropzone";
import { useSetModal } from "components/Modal/Modal";
import { useFormContext } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { Button, InputRow } from "../../../common";
import { FormValues } from "../../types";

export default function ProofOfIdentity() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  // For some reason Yup doesn't set any error fields related to the array itself (judged by the type assumed
  // to be 'FieldError[] | undefined'), but only sets the fields of its items, so we have to convert it to 'any'
  const errorMessage = !!errors?.proofOfIdentity?.length
    ? errors.proofOfIdentity[0].message
    : (errors?.proofOfIdentity as any)?.message;

  return (
    <InputRow
      htmlFor="proofOfIdentity"
      label="Your proof of identity"
      infoModal={ProofOfIdentityModal}
      required
    >
      <FileDropzone<FormValues>
        name="proofOfIdentity"
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
