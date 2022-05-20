import { useModalContext } from "contexts/ModalContext";
import { FC } from "react";
import { resetTxFormState } from "services/transaction/transactionSlice";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";

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

export type TxProps<C> = {
  Content: FC<C>;
  contentProps: C;
  inModal?: true;
};
