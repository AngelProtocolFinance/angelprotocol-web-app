import Prompt from "@ap/components/prompt";
import { GENERIC_ERROR_MESSAGE } from "@ap/constants";
import { useModalContext } from "@ap/contexts";
import {
  APError,
  AP_ERROR_DISCRIMINATOR,
  WalletNotInstalledError,
} from "@ap/errors";
import { logger } from "@ap/helpers";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import InstallWallet from "./InstallWalletContent";

type State = { handleError: (error: any, displayMessage?: string) => void };

const Context = createContext<State>({
  handleError: (_: any, __?: string) => {},
});

export default function ErrorContext(props: PropsWithChildren) {
  const { showModal } = useModalContext();

  const handleError = useCallback(
    (error: any, displayMessage?: string) => {
      logger.error(error);

      if (displayMessage) {
        showModal(Prompt, {
          type: "error",
          children: displayMessage,
        });
      } else if (typeof error === "string") {
        showModal(Prompt, {
          type: "error",
          children: error,
        });
      } else if (instanceOfAPError(error)) {
        if (error instanceof WalletNotInstalledError) {
          showModal(Prompt, {
            headline: "Install Wallet",
            children: <InstallWallet providerId={error.meta} />,
          });
        } else {
          showModal(Prompt, {
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
          type: "error",
          children: GENERIC_ERROR_MESSAGE,
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
