import { useModalContext } from "components/ModalContext/ModalContext";
import Icon from "components/Icons/Icons";

export default function WalletPrompt(props: { message: string }) {
  const { closeModal } = useModalContext();

  function acknowledge() {
    closeModal();
  }
  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full shadow-lg h-full content-center place-items-center">
      <Icon type="Info" className="text-angel-grey text-2xl mb-2 " />
      <p className="text-center text-angel-grey mb-2 ">{props.message}</p>
      <button
        onClick={acknowledge}
        className="bg-angel-orange text-white rounded-md uppercase py-1 px-4 mt-4"
      >
        ok
      </button>
    </div>
  );
}
