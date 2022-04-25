import { useMemo } from "react";
import { setStage } from "slices/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import Icon from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";
import ReceiptForm from "components/Receipter/ReceiptForm";
import Receipter from "components/Receipter/Receipter";
import Broadcast from "./Broadcast";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Success from "./Success";

export default function TransactionPrompt() {
  const stage = useGetter((state) => state.transaction.stage);
  const dispatch = useSetter();
  const { hideModal } = useSetModal();
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
      case "receipt":
        return (
          <Receipter {...stage}>
            <ReceiptForm />
          </Receipter>
        );
    }
  }, [stage]);

  function closePrompt() {
    if (
      stage.step === "success" ||
      stage.step === "receipt" ||
      stage.step === "error"
    ) {
      dispatch(setStage({ step: "form" }));
      hideModal();
    } else {
      hideModal();
    }
  }

  return (
    <div className="relative bg-white-grey rounded-md pt-4 w-full max-w-md">
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
