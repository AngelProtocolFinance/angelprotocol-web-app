import { useMemo } from "react";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import Icon from "components/Icon";
import { useModalContext } from "components/ModalContext/ModalContext";
import ReceiptForm from "components/Receipter/ReceiptForm";
import Receipter from "components/Receipter/Receipter";
import { useGetter, useSetter } from "store/accessors";
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
      case Step.submit:
        return <Submit {...stage} />;
      case Step.broadcast:
        return <Broadcast {...stage} />;
      case Step.success:
        return <Success {...stage} />;
      case Step.error:
        return <ErrPop {...stage} />;
      case Step.receipt:
        return (
          <Receipter {...stage}>
            <ReceiptForm />
          </Receipter>
        );
      default:
        throw Error("wrong prompt");
    }
  }, [stage]);

  function closePrompt() {
    if (
      stage.step === Step.success ||
      stage.step === Step.receipt ||
      stage.step === Step.error
    ) {
      dispatch(setStage({ step: Step.form }));
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
