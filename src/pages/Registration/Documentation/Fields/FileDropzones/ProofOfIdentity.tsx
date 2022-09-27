import { Dialog } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { DocumentationValues } from "pages/Registration/types";
import { useModalContext } from "contexts/ModalContext";
import FileDropzone from "components/FileDropzone";
import { Button, InputRow } from "../../../common";

export default function ProofOfIdentity() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<DocumentationValues>();

  return (
    <InputRow
      htmlFor="proofOfIdentity"
      label="Your proof of identity"
      infoModal={ProofOfIdentityModal}
      required
    >
      <FileDropzone<DocumentationValues>
        name="proofOfIdentity"
        className="h-8"
        disabled={isSubmitting}
      />
      <ErrorMessage
        errors={errors}
        name="proofOfIdentity"
        as="p"
        className="w-full text-xs text-red text-center"
      />
    </InputRow>
  );
}

function ProofOfIdentityModal() {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="fixed-center z-20 bg-white max-w-sm p-3 pb-5 rounded-xl shadow-lg text-center text-blue">
      <BsX
        className="text-gray-300 text-2xl ml-auto hover:cursor-pointer"
        onClick={closeModal}
      />
      <p className="p-4">
        ### EXPLANATION FOR REASONS FOR ASKING PROOF OF IDENTITY AND ACCEPTABLE
        TYPES ###
      </p>
      <Button className="btn-secondary w-40 h-10" onClick={closeModal}>
        Got it
      </Button>
    </Dialog.Panel>
  );
}
