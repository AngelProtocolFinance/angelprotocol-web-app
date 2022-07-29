import { PropsWithChildren, createContext, useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";

type State = {
  setError: (error: Error) => void;
};

const ErrorContext = createContext<State>({ setError: (_: Error) => {} });

export default function ErrorDisplayer(props: PropsWithChildren<{}>) {
  const { showModal } = useModalContext();

  const setError = useCallback(
    (error: Error) => {
      showModal(Popup, { message: error.message });
    },
    [showModal]
  );

  return (
    <ErrorContext.Provider value={{ setError }}>
      {props.children}
    </ErrorContext.Provider>
  );
}
