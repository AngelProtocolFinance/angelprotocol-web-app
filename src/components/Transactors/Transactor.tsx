import { FC } from "react";
import { useSetModal } from "components/Modal/Modal";
import { useSetter } from "store/accessors";
import { resetTxFormState } from "services/transaction/transactionSlice";
import Icon, { IconTypes } from "components/Icons/Icons";

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
          <Icon iconType={IconTypes.Clock} size={25} />
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
