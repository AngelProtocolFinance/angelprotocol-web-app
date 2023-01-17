import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import Prompt from "components/Prompt";
import { logger } from "helpers";
import {
  APError,
  AP_ERROR_DISCRIMINATOR,
  WalletNotInstalledError,
} from "errors/errors";
import { useModalContext } from "../ModalContext";
import InstallWallet from "./InstallWalletContent";

type HandleError = (
  error: any,
  displayMessage?: string,
  headline?: string
) => void;
type State = { handleError: HandleError };

const Context = createContext<State>({
  handleError: (_: any, __?: string) => {},
});

export default function ErrorContext(props: PropsWithChildren<{}>) {
  const { showModal } = useModalContext();

  const handleError: HandleError = useCallback(
    (error, displayMessage, headline) => {
      logger.error(error);

      if (displayMessage) {
        showModal(Prompt, {
          headline,
          type: "error",
          children: displayMessage,
        });
      } else if (typeof error === "string") {
        showModal(Prompt, {
          headline,
          type: "error",
          children: error,
        });
      } else if (instanceOfAPError(error)) {
        if (error instanceof WalletNotInstalledError) {
          showModal(Prompt, {
            headline: "Install Wallet",
            children: <InstallWallet providerId={error.providerId} />,
          });
        } else {
          showModal(Prompt, {
            headline,
            type: "error",
            children: error.message,
          });
        }
      } else if (instanceOfAPError(error.data)) {
        handleError(error.data);
      } else if ("message" in error) {
        handleError(error.message);
      } else if (error.data && "message" in error.data) {
        handleError(error.data.message);
      } else if ("error" in error) {
        handleError(error.error);
      } else {
        showModal(Prompt, {
          headline,
          type: "error",
          children: "Unknown error children",
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
