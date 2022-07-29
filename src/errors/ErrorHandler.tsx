import { PropsWithChildren, useCallback, useEffect } from "react";
import ErrorContext from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";

export default function ErrorHandler(
  props: PropsWithChildren<{ error?: Error }>
) {
  const { showModal } = useModalContext();

  useEffect(() => {
    if (props.error) {
      showModal(Popup, { message: props.error.message });
    }
  }, [props.error, showModal]);

  const handleError = useCallback(
    ({ message }: Error) => showModal(Popup, { message, canBeClosed: false }),
    [showModal]
  );

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {props.children}
    </ErrorContext.Provider>
  );
}
