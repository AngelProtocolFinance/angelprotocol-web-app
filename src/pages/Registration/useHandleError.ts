import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";

export default function useHandleError() {
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error, displayMessage?: string) => {
      console.log(error);
      const message =
        displayMessage ||
        (typeof error === "string" ? error : JSON.stringify(error));
      showModal(Popup, { message });
    },
    [showModal]
  );

  return handleError;
}
