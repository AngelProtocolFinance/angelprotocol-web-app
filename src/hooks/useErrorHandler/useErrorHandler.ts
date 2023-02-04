import { useModalContext } from "contexts/ModalContext";
import Prompt, { TxPrompt } from "components/Prompt";
import { processError } from "./processError";

export default function useErrorHandler() {
  const { showModal, setModalOption } = useModalContext();

  function handleError(error: unknown) {
    const err = processError(error);

    if (typeof err === "string") {
      return showModal(Prompt, { children: err, type: "error" });
    }

    if (err.type === "tx") {
      return showModal(TxPrompt, {
        error: err.message,
        ...(err.tx ? { hash: err.tx.hash, chainID: err.tx.chainId } : {}),
      });
    }
    return showModal(Prompt, { children: err.message, type: "error" });
  }

  return { handleError, showModal, setModalOption };
}
