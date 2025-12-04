import { emails } from "constants/common";
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

function parse_error(error: unknown): string | undefined {
  if (typeof error === "string") return error;

  if (typeof error === "object" && error != null) {
    if ("message" in error) return parse_error(error.message);
    if ("data" in error) return parse_error(error.data);
    if ("error" in error) return parse_error(error.error);
  }

  if (error instanceof Error) return error.message;
}
const generic_msg = (context?: string) =>
  `An unexpected error occurred${
    context ? ` while ${context} ` : " "
  }and has been reported. Please get in touch with ${emails.hi} if the problem persists.`;

export const error_prompt = (error: unknown, display?: DisplayType) => {
  console.error(error);
  const disp = display || {};
  return {
    type: "error" as const,
    children:
      disp === "parsed"
        ? parse_error(error)
        : "custom" in disp
          ? disp.custom
          : generic_msg(disp.context),
  };
};
