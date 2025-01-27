import { EMAIL_SUPPORT } from "constants/env";
import { logger } from "helpers";
import type { ReactNode } from "react";

type Generic = {
  /**
   * context in present participle
   * @example sending message
   * @example loading resouce
   */
  context?: string;
};
type DisplayType = "parsed" | Generic | { custom: ReactNode };

function parseError(error: unknown): string | undefined {
  if (typeof error === "string") return error;

  if (typeof error === "object" && error != null) {
    if ("message" in error) return parseError(error.message);
    if ("data" in error) return parseError(error.data);
    if ("error" in error) return parseError(error.error);
  }

  if (error instanceof Error) return error.message;
}

export const errorPrompt = (error: unknown, display?: DisplayType) => {
  logger.error(error);
  const disp = display || {};
  return {
    type: "error" as const,
    children:
      disp === "parsed"
        ? parseError(error)
        : "custom" in disp
          ? disp.custom
          : genericMsg(disp.context),
  };
};

const genericMsg = (context?: string) =>
  `An unexpected error occurred${
    context ? ` while ${context} ` : " "
  }and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;
