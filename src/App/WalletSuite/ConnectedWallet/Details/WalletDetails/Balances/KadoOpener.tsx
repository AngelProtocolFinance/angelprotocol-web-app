import { useModalContext } from "contexts/ModalContext";
import KadoModal from "components/KadoModal";

export default function KadoOpener() {
  const { showModal } = useModalContext();
  return (
    <button
      className="font-bold underline hover:text-orange transition ease-in-out duration-300"
      onClick={() => showModal(KadoModal, {})}
    >
      Buy some crypto here
    </button>
  );
}
