import Prompt from "components/Prompt";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { logger } from "helpers";
import { ReactNode } from "react";
import { useModalContext } from "../ModalContext";

export function parseError(error: unknown): string | undefined {
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

  /**
   * @description for unexpected errors
   * @param error - unknown error occured
   * @param displayMessage - overrides parsed or generic error message
   */
  function handleError(error: unknown, displayMessage?: ReactNode) {
    showModal(Prompt, {
      type: "error",
      children: displayMessage || parseError(error) || GENERIC_ERROR_MESSAGE,
    });
    logger.error(error);
  }

  return { handleError, displayError };
}
