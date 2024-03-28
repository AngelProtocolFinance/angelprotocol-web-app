import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { GENERIC_ERROR_MESSAGE } from "constants/common";

export function handleMutationResult<T extends any>(
  result:
    | {
        data: T;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      },
  onError: (error: unknown) => void,
  onSuccess?: (data: T) => void
) {
  if ("error" in result) {
    /** narrow to server error */
    if (
      "data" in result.error /** narrow first to FetchBaseQueryError */ &&
      isServerError(result.error)
    ) {
      const d: any = result.error.data;
      if (typeof d === "string") {
        onError(d);
      } else if ("message" in d) {
        onError(d.message);

        /** update with other aws error formats */
      } else {
        onError(d);
      }
    } else {
      onError(GENERIC_ERROR_MESSAGE);
    }
  } else {
    onSuccess && onSuccess(result.data);
  }
}

function isServerError(
  error: FetchBaseQueryError
): error is { data: any; status: number } {
  return "status" in error && typeof error.status === "number" && !!error.data;
}