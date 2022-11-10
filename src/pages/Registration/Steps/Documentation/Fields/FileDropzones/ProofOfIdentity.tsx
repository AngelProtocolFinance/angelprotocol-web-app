import { Dialog } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { DocumentationValues } from "pages/Registration/types";
import { useModalContext } from "contexts/ModalContext";
import FileDropzone from "components/FileDropzone";
import { Button, InputRow } from "../../../../common";

export default function ProofOfIdentity() {
  const {
    formState: { isSubmitting },
  } = useFormContext<DocumentationValues>();

  return (
    <InputRow
      htmlFor="proofOfIdentity"
      label="Your proof of identity"
      infoModal={ProofOfIdentityModal}
      required
    >
      <FileDropzone<DocumentationValues, "proofOfIdentity">
        name="proofOfIdentity"
        className="h-8"
        disabled={isSubmitting}
      />
    </InputRow>
  );
}

function ProofOfIdentityModal() {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="fixed-center z-20 bg-white max-w-sm p-3 pb-5 rounded-xl shadow-lg text-center text-blue">
      <BsX
        className="text-gray-l1 text-2xl ml-auto hover:cursor-pointer"
        onClick={closeModal}
      />
      <p className="p-4">
        We need to confirm you are an authorized representative of your charity.
        Please upload a picture (JPEG or PDF) of either a driver's license or a
        passport page that shows your details.
      </p>
      <Button className="btn-blue w-40 h-10" onClick={closeModal}>
        Got it
      </Button>
    </Dialog.Panel>
  );
}
