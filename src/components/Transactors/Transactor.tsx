import { FC } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Modal/Modal";
import { useSetter } from "store/accessors";
import { resetTxFormState } from "services/transaction/transactionSlice";

export default function Transactor<C>(props: TxProps<C>) {
  const dispatch = useSetter();
  const { hideModal } = useSetModal();

  function close() {
    dispatch(resetTxFormState());
    hideModal();
  }

  return (
    <div
      className={`relative ${props.inModal ? "bg-white rounded-md pt-4" : ""}`}
    >
      {props.inModal && (
        <button
          onClick={close}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose size={25} />
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
