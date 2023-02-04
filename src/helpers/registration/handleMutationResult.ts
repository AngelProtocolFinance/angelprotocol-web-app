import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const AWS_FAIL =
  "Server encountered an unexpected error. Please get in touch with support@angelprotocol.io if the problem persists.";

const APP_FAIL =
  "App encountered an unexpected error while processing request. Please get in touch with support@angelprotocol.io if the problem persists.";

type Data<T> = { data: T };
type Error = { error: FetchBaseQueryError | SerializedError };
export function handleMutationResult<T extends any>(
  result: Data<T> | Error,
  {
    onSuccess,
    onError,
  }: { onSuccess?(data: T): void; onError?(error: unknown): void }
) {
  //rethrow error if no onError handler is provided
  function handle(error: unknown) {
    if (!onError) throw error;
    onError(error);
  }

  if ("error" in result) {
    const { error } = result;
    if (isFetchBaseQueryError(error)) {
      if (typeof error.status === "string") {
        //switch cases error.status
        switch (error.status) {
          case "FETCH_ERROR":
            return handle(APP_FAIL);
          case "PARSING_ERROR":
            return handle(AWS_FAIL);
          case "TIMEOUT_ERROR":
            return handle("Timeout: Please try again later.");
          case "CUSTOM_ERROR":
            return handle(error.error);
          default:
            return handle(AWS_FAIL);
        }
      }
      //generic server error
      if (error.status >= 500) {
        return handle(AWS_FAIL);
      }
      //string data
      if (typeof error.data === "string") {
        return handle(error.data);
      }

      if (hasMessage(error.data)) {
        return handle(error.data.message);
      }

      //Serialized error
    } else {
      return handle(error.message);
    }
  } else {
    onSuccess && onSuccess(result.data);
  }
}

function isFetchBaseQueryError(
  error: SerializedError | FetchBaseQueryError
): error is FetchBaseQueryError {
  return "status" in error;
}

function hasMessage(data?: unknown): data is { message: string } {
  return typeof data === "object" && data !== null && "message" in data;
}
