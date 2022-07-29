import { PropsWithChildren, useCallback, useEffect } from "react";
import ErrorContext from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { APError } from "./errors";

export default function ErrorHandler(
  props: PropsWithChildren<{ error?: Error }>
) {
  const { showModal } = useModalContext();

  useEffect(() => {
    if (props.error) {
      // field 'dismissable' shouldn't appear in errors catched by ErrorBoundary as APError can
      // only be thrown from inside event handlers/async function and other components that cannot
      // be caught by the boundary
      // see docs for more details: https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
      showModal(Popup, { message: props.error.message });
    }
  }, [props.error, showModal]);

  const handleError = useCallback(
    (error: Error | APError) => {
      const canBeClosed = "dismissable" in error && error.dismissable;
      showModal(
        Popup,
        {
          message: error.message,
          hideCloseBtn: !canBeClosed,
        },
        undefined,
        canBeClosed
      );
    },
    [showModal]
  );

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {props.children}
    </ErrorContext.Provider>
  );
}
