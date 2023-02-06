import { useModalContext } from "contexts/ModalContext";
import Prompt, { TxPrompt } from "components/Prompt";
import { processError } from "./processError";

export default function useErrorHandler(source: string) {
  const { showModal, setModalOption } = useModalContext();

  function handleError(error: unknown) {
    const err = processError(error, source);

    if (err.type === "tx") {
      return showModal(TxPrompt, {
        error: err.message,
        tx: err.tx,
        report: err.report,
      });
    }
    return showModal(Prompt, {
      children: err.message,
      type: "error",
      report: err.report,
    });
  }

  return { handleError, showModal, setModalOption };
}
