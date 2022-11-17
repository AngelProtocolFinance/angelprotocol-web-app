import { Dialog } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { FormValues } from "../../types";
import { useModalContext } from "contexts/ModalContext";
import FileDropzone from "components/FileDropzone";
import { BtnSec } from "components/registration";
import { InputRow } from "../../../../common";

export default function ProofOfIdentity() {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      htmlFor="proofOfIdentity"
      label="Your proof of identity"
      infoModal={ProofOfIdentityModal}
      required
    >
      <FileDropzone<FormValues, "proofOfIdentity">
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
      <BtnSec onClick={closeModal}>Got it</BtnSec>
    </Dialog.Panel>
  );
}
