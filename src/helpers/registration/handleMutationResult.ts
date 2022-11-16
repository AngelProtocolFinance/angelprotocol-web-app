import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function handleMutationResult<T extends any>(
  result:
    | {
        data: T;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      },
  onSuccess: (data: T) => void,
  onError: (error: unknown) => void
) {
  if ("error" in result) {
    if ("data" in result.error) {
      onError(result.error);
    } else {
      onError(
        "An error occured. Please try again later. If the error persists, please contact support@angelprotocol.io"
      );
    }
  } else {
    onSuccess(result.data);
  }
}
