import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";

export default function WalletPrompt(props: { message: string }) {
  const { closeModal } = useModalContext();

  function acknowledge() {
    closeModal();
  }

  return (
    <div className="bg-white grid p-4 rounded-md w-[95%] shadow-lg content-center place-items-center absolute-center z-20">
      <Icon type="Info" className="text-angel-grey text-2xl mb-2 " />
      <p className="text-center text-sm text-angel-grey mb-2 ">
        {props.message}
      </p>
      <button
        onClick={acknowledge}
        className="bg-orange text-white rounded-md uppercase py-1 px-4 mt-4"
      >
        ok
      </button>
    </div>
  );
}
