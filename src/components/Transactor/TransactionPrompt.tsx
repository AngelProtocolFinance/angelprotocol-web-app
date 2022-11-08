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
  const { closeModal, onModalClose, setDismissible, isDismissible } =
    useModalContext();
  const { handleError } = useErrorContext();

  useEffect(() => {
    switch (stage.step) {
      case "initial":
        setDismissible(true);
        break;
      case "success":
      case "error":
        setDismissible(true);
        onModalClose(() => dispatch(resetTxFormState()));
        break;
      case "broadcast":
      case "submit":
        setDismissible(false);
        break;
      default:
        setDismissible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage.step, onModalClose]);

  const prompt = useMemo(() => {
    switch (stage.step) {
      case "initial":
        return children;
      case "submit":
        return <Submit {...stage} />;
      case "broadcast":
        return <Broadcast {...stage} />;
      case "success":
        return <Success {...stage} />;
      case "error":
        return <ErrPop {...stage} />;
      default:
        handleError("wrong prompt");
        return null;
    }
  }, [stage, children, handleError]);

  if (inModal) {
    return (
      <Dialog.Panel className={`${containerClasses} fixed-center z-20`}>
        {isDismissible && (
          <button
            onClick={closeModal}
            className="absolute right-2 top-2 text-gray-d2 hover:text-black"
          >
            <Icon type="Close" size={25} />
          </button>
        )}

        {prompt}
      </Dialog.Panel>
    );
  }

  return <div className={containerClasses}>{prompt}</div>;
}

const containerClasses =
  "w-full max-w-md bg-white rounded-md overflow-visible pt-4";
