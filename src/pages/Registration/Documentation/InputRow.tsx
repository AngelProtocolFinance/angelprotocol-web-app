import { useSetModal } from "components/Modal/Modal";
import { PropsWithChildren } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import ProofOfIdentityModal from "./ProofOfIdentityModal";

export type InputRowProps = PropsWithChildren<{
  id?: string;
  label: string;
  required?: true | boolean;
}>;

export default function InputRow(props: InputRowProps) {
  const { id, label, required, children } = props;

  return (
    <div className="grid grid-cols-2 items-center">
      <label htmlFor={id} className="hover:cursor-pointer">
        {label}
        {required && <span className="text-failed-red ml-0.5">*</span>}
      </label>
      <div className="flex flex-col gap-1 w-full items-center relative">
        {children}
      </div>
    </div>
  );
}

function InfoIcon() {
  const { showModal } = useSetModal();
  const showProofOfIdentityModal = () => showModal(ProofOfIdentityModal, {});
  return (
    <BsExclamationCircle
      className="text-thin-blue cursor-pointer"
      onClick={showProofOfIdentityModal}
    />
  );
}
