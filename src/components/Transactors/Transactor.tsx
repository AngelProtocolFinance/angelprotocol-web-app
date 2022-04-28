import { TxProps } from "@types-component/transactor";
import { resetTxFormState } from "slices/transaction/transactionSlice";
import { useSetter } from "store/accessors";
import Icon from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";

export default function Transactor<C>(props: TxProps<C>) {
  const dispatch = useSetter();
  const { hideModal } = useSetModal();

  function close() {
    dispatch(resetTxFormState());
    hideModal();
  }

  return (
    <div
      className={`relative w-full max-w-md ${
        props.inModal ? "bg-white-grey rounded-md overflow-hidden pt-4" : ""
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
