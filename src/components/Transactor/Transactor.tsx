import { useMemo } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Receipter from "components/Receipter";
import { TxProps } from "components/Transactor";
import Broadcast from "components/Transactor/Broadcast";
import ErrPop from "components/Transactor/ErrPop";
import Submit from "components/Transactor/Submit";
import Success from "components/Transactor/Success";
import { useGetter, useSetter } from "store/accessors";
import { resetTxFormState } from "slices/transaction/transactionSlice";

export default function Transactor<C>(props: TxProps<C>) {
  const stage = useGetter((state) => state.transaction.stage);
  const dispatch = useSetter();
  const { closeModal } = useModalContext();

  const prompt = useMemo(() => {
    switch (stage.step) {
      case "initial":
        return <props.Content {...props.contentProps} />;
      case "kyc":
        return <Receipter />; //no prev tx details
      case "submit":
        return <Submit {...stage} />;
      case "broadcast":
        return <Broadcast {...stage} />;
      case "success":
        return <Success {...stage} />;
      case "error":
        return <ErrPop {...stage} />;
      default:
        throw Error("wrong prompt");
    }
  }, [stage]);

  function closePrompt() {
    if (stage.step === "success" || stage.step === "error") {
      dispatch(resetTxFormState());
    }
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
          onClick={closePrompt}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <Icon type="Close" size={25} />
        </button>
      )}
      {prompt}
    </div>
  );
}
