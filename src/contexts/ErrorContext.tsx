import { PropsWithChildren, useCallback, useContext } from "react";
import { createContext } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { logger } from "helpers";
import { APError, AP_ERROR_DISCRIMINATOR } from "errors/errors";

type State = { handleError: (error: any, displayMessage?: string) => void };

const Context = createContext<State>({
  handleError: (_: any, __?: string) => {},
});

export default function ErrorContext(props: PropsWithChildren<{}>) {
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error: any, displayMessage?: string) => {
      logger.error(error);

      if (displayMessage) {
        showModal(Popup, { message: displayMessage });
      } else if (typeof error === "string") {
        showModal(Popup, { message: error });
      } else if (instanceOfAPError(error)) {
        showModal(Popup, { message: error.message });
      } else if (instanceOfAPError(error.data)) {
        handleError(error.data);
      } else if ("message" in error) {
        handleError(error.message);
      } else if ("error" in error) {
        handleError(error.error);
      } else {
        showModal(Popup, {
          message: `Unknown error occurred`,
        });
      }
    },
    [showModal]
  );

  return (
    <Context.Provider value={{ handleError }}>
      {props.children}
    </Context.Provider>
  );
}

function instanceOfAPError(obj: any): obj is APError {
  return (
    !!obj &&
    (obj.discriminator === AP_ERROR_DISCRIMINATOR || obj instanceof Error)
  );
}

export function useErrorContext() {
  return useContext(Context);
}
