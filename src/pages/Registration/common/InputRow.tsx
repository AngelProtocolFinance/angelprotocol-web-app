import { BsQuestionCircle } from "react-icons/bs";
import { InputProps } from "./types";
import { useModalContext } from "contexts/ModalContext";

export function InputRow(props: InputProps) {
  const { htmlFor: id, label, required, infoModal, children } = props;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center gap-2 h-8">
        <label htmlFor={id} className="cursor-pointer">
          {label}
          {required && <span className="text-failed-red ml-0.5">*</span>}
        </label>
        {!!infoModal && <InfoIcon modal={infoModal} />}
      </div>
      <div className="flex flex-col justify-center gap-1 w-full">
        {children}
      </div>
    </div>
  );
}

function InfoIcon({ modal }: { modal: React.FC<{}> }) {
  const { showModal } = useModalContext();
  return (
    <BsQuestionCircle
      className="text-thin-blue cursor-pointer"
      onClick={() => showModal(modal, {})}
    />
  );
}
