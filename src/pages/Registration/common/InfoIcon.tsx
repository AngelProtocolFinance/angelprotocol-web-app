import { BsQuestionCircle } from "react-icons/bs";
import { useModalContext } from "contexts/ModalContext";

export default function InfoIcon({ modal }: { modal: React.FC<{}> }) {
  const { showModal } = useModalContext();
  return (
    <BsQuestionCircle
      className="text-blue cursor-pointer"
      onClick={() => showModal(modal, {})}
    />
  );
}
