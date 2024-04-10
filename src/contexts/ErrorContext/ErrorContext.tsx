import Prompt from "components/Prompt";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { logger } from "helpers";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
} from "react";
import { useModalContext } from "../ModalContext";

type State = {
  handleError: (
    error: any,
    displayMessage?: string,
    options?: { log: boolean }
  ) => void;
};

const Context = createContext<State>({
  handleError: (_: any, _1?: string, _2?: { log: boolean }) => {},
});

export default function ErrorContext(props: PropsWithChildren<{}>) {
  const { showModal } = useModalContext();

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies: bug in Biome with recursive dependencies
   * Created an issue on their GH, see https://github.com/biomejs/biome/issues/2361
   */
  const handleError: State["handleError"] = useCallback(
    (error: any, displayMessage?: string, options = { log: true }) => {
      if (options.log) {
        logger.error(error);
      }

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
      } else if ("message" in error) {
        handleError(error.message);
        //TODO: specify controlled error shapes
      } else if (error.data && typeof error.data === "string") {
        handleError(error.data);
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

export function useErrorContext() {
  const { showModal } = useModalContext();

  /**
   * @description for expected errors
   * @param message - user can do something about
   * @param error - if provided, would be logged to sentry for further investigation
   */
  function displayError(message: string | ReactNode, error?: unknown) {
    showModal(Prompt, { children: message });
    if (error) {
      logger.error(error);
    }
  }

  /**
   * @description for unexpected errors
   * @param error - unknown error occured
   * @param displayMessage - overrides parsed or generic error message
   */
  function handleError(error: unknown, displayMessage?: string) {
    //TODO: parse error
    const parsed = displayMessage || GENERIC_ERROR_MESSAGE;
    showModal(Prompt, { children: parsed });
    logger.error(error);
  }

  return { handleError, displayError };
}
