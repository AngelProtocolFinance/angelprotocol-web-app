import { PropsWithChildren, useCallback, useContext } from "react";
import { createContext } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import logger from "helpers/logger";

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
      } else if (error instanceof Error) {
        showModal(Popup, { message: error.message });
      } else if ("data" in error && error.data instanceof Error) {
        handleError(error.data);
      } else if ("error" in error) {
        handleError(error.error);
      } else if ("message" in error || "status" in error) {
        //  e.g. FetchBaseQueryError or SerializedError from @reduxjs/toolkit
        showModal(Popup, {
          message: `Error occurred: ${error.message ?? error.status}`,
        });
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

export function useErrorContext() {
  return useContext(Context);
}
