import { Dialog } from "@headlessui/react";
import { PropsWithChildren, useMemo } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { useGetter } from "store/accessors";
import Broadcast from "./Broadcast";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Success from "./Success";

export default function TransactionPrompt({
  children,
  inModal = true,
}: PropsWithChildren<{ inModal?: boolean }>) {
  const stage = useGetter((state) => state.transaction.stage);
  const { closeModal } = useModalContext();
  const { handleError } = useErrorContext();

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

export const TransactionPromptName = TransactionPrompt.name;
const containerClasses =
  "w-full max-w-md bg-white-grey rounded-md overflow-visible pt-4";
