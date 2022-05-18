import { TxProps } from "@types-component/transactor";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { resetTxFormState } from "slices/transaction/transactionSlice";

export default function Transactor<C>(props: TxProps<C>) {
  const dispatch = useSetter();
  const { closeModal } = useModalContext();

  function close() {
    dispatch(resetTxFormState());
    closeModal();
  }

  return (
    <div
      className={`w-full max-w-md ${
        props.inModal
          ? "bg-white-grey rounded-md overflow-visible pt-4 fixed-center z-20"
          : "relative"
      }`}
    >
      {props.inModal && (
        <button
          onClick={close}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <Icon type="Close" size={25} />
        </button>
      )}
      <props.Content {...props.contentProps} />
    </div>
  );
}
