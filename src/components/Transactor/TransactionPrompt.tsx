import { useMemo } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";
import Broadcast from "./Broadcast";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Success from "./Success";

export default function TransactionPrompt() {
  const stage = useGetter((state) => state.transaction.stage);
  const dispatch = useSetter();
  const { closeModal } = useModalContext();

  const prompt = useMemo(() => {
    switch (stage.step) {
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
      dispatch(setStage({ step: "initial" }));
    }
    closeModal();
  }

  return (
    <div className="bg-white-grey rounded-md pt-4 w-full max-w-md fixed-center z-20">
      <button
        onClick={closePrompt}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={25} />
      </button>

      {prompt}
    </div>
  );
}
