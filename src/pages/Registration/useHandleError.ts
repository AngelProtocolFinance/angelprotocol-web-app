import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import logger from "helpers/logger";

export default function useHandleError() {
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error, displayMessage?: string) => {
      logger.log(error);
      const message =
        displayMessage ||
        (typeof error === "string" ? error : JSON.stringify(error));
      showModal(Popup, { message });
    },
    [showModal]
  );

  return handleError;
}
