import { Dialog } from "@headlessui/react";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
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
  const { closeModal, onModalClose, setDismissible } = useModalContext();
  const { handleError } = useErrorContext();

  useEffect(() => {
    switch (stage.step) {
      case "initial":
        dispatch(resetTxFormState());
        break;
      case "success":
      case "error":
        onModalClose(() => dispatch(resetTxFormState()));
    }
  }, [stage.step, dispatch, onModalClose]);

  const prompt = useMemo(() => {
    switch (stage.step) {
      case "initial":
        setDismissible(true);
        return children;
      case "submit":
        setDismissible(false);
        return <Submit {...stage} />;
      case "broadcast":
        setDismissible(false);
        return <Broadcast {...stage} />;
      case "success":
        setDismissible(true);
        return <Success {...stage} />;
      case "error":
        setDismissible(true);
        return <ErrPop {...stage} />;
      default:
        handleError("wrong prompt");
        return null;
    }
  }, [stage, children, handleError]);

  if (inModal) {
    return (
      <Dialog.Panel className={`${containerClasses} fixed-center z-20`}>
        <button
          onClick={closeModal}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <Icon type="Close" size={25} />
        </button>

        {prompt}
      </Dialog.Panel>
    );
  }

  return <div className={containerClasses}>{prompt}</div>;
}

const containerClasses =
  "w-full max-w-md bg-white-grey rounded-md overflow-visible pt-4";
