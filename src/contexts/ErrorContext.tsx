import { PropsWithChildren, useCallback, useContext } from "react";
import { createContext } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import logger from "helpers/logger";
import { APError } from "../errors/errors";

type State = { handleError: (error: any, displayMessage?: string) => void };

const Context = createContext<State>({
  handleError: (_: any, __?: string) => {},
});

export default function ErrorContext(props: PropsWithChildren<{}>) {
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error: any, displayMessage?: string) => {
      logger.log(error);

      if (displayMessage) {
        showModal(Popup, { message: displayMessage });
      } else if (typeof error === "string") {
        showModal(Popup, { message: error });
      } else if (isErrorInstance(error)) {
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
      } else if ("data" in error || "message" in error || "status" in error) {
        //  e.g. FetchBaseQueryError or SerializedError from @reduxjs/toolkit
        if (!!error.data) {
          handleError(error.data);
        } else {
          showModal(Popup, {
            message: `Error occurred: ${error.message ?? error.status}`,
          });
        }
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

function isErrorInstance(error: unknown): error is Error | APError {
  return error instanceof Error || error instanceof APError;
}

export function useErrorContext() {
  return useContext(Context);
}
