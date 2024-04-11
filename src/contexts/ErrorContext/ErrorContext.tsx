import Prompt from "components/Prompt";
import { EMAIL_SUPPORT } from "constants/env";
import { logger } from "helpers";
import { ReactNode } from "react";
import { useModalContext } from "../ModalContext";

function parseError(error: unknown): string | undefined {
  if (typeof error === "string") return error;

  if (typeof error === "object" && error != null) {
    if ("message" in error) return parseError(error.message);
    if ("data" in error) return parseError(error.data);
    if ("error" in error) return parseError(error.error);
  }

  if (error instanceof Error) return error.message;
}

export function useErrorContext() {
  const { showModal } = useModalContext();

  /**
   * @description for expected errors
   * @param message - user can do something about
   * @param error - if provided, would be logged to sentry for further investigation
   */
  function displayError(message: ReactNode, error?: unknown) {
    showModal(Prompt, { type: "error", children: message });
    if (error) {
      logger.error(error);
    }
  }

  type Generic = {
    /**
     * context in present participle
     * @example sending message
     * @example loading resouce
     */
    context?: string;
  };
  type DisplayType = "parsed" | Generic | { custom: ReactNode };

  /**
   * @description for unexpected errors
   * @param error - unknown error occured
   * @param display - error info shown to user
   */
  function handleError(error: unknown, display?: DisplayType) {
    const disp = display || {};
    showModal(Prompt, {
      type: "error",
      children:
        disp === "parsed"
          ? parseError(error)
          : "custom" in disp
            ? disp.custom
            : genericMsg(disp.context),
    });
    logger.error(error);
  }

  return { handleError, displayError };
}

const genericMsg = (context?: string) =>
  `An unexpected error occurred${
    context ? `while ${context}` : " "
  }and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;
