import { PropsWithChildren, useMemo } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Receipter from "components/Receipter";
import { useGetter, useSetter } from "store/accessors";
import { resetTxFormState } from "slices/transaction/transactionSlice";
import Broadcast from "./Broadcast";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Success from "./Success";

export default function TransactionPrompt({
  children,
  inModal = true,
}: PropsWithChildren<{ inModal?: boolean }>) {
  const stage = useGetter((state) => state.transaction.stage);
  const dispatch = useSetter();
  const { closeModal } = useModalContext();

  const prompt = useMemo(() => {
    switch (stage.step) {
      case "initial":
        return children;
      case "kyc":
        return <Receipter prevKYC={stage.kycData} />; //no prev tx details
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
  }, [stage, children]);

  function closePrompt() {
    switch (stage.step) {
      case "success":
      case "error":
      case "kyc":
        dispatch(resetTxFormState());
    }
    closeModal();
  }

  return (
    <div
      className={`w-full max-w-md ${
        inModal
          ? "bg-white-grey rounded-md overflow-visible pt-4 fixed-center z-20"
          : "relative"
      }`}
    >
      {inModal && (
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
