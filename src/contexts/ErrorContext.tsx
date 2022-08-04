import { PropsWithChildren, useCallback, useContext, useEffect } from "react";
import { createContext } from "react";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { APError } from "../errors/errors";

type State = { handleError: (error: any) => void };

const Context = createContext<State>({ handleError: (_: any) => {} });

export default function ErrorContext(
  props: PropsWithChildren<{
    error?: Error;
  }>
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
    (error: any) => {
      console.log(error);

      if (typeof error === "string") {
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
            message: `Error occurred while fetching: ${
              error.message ?? error.status
            }`,
          });
        }
      } else {
        showModal(Popup, {
          message: `Unknown error occurred while fetching`,
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
