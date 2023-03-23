import { ReactElement } from "react";
import { SWRResponse } from "swr";
import Status, { ErrorStatus, LoadingStatus } from "components/Status";
import { isEmpty } from "helpers";

type Props<T> = {
  queryState: SWRResponse<T>;
  messages: {
    loading?: string | ReactElement;
    error?: string | ReactElement;
    empty?: T extends any[] ? string | ReactElement : never;
  };
  classes?: { container?: string };
  filterFn?: T extends (infer Item)[]
    ? (item: Item, idx: number) => boolean
    : never;
  children(data: NonNullable<T>): ReactElement;
};

export default function SWRLoader<T>({
  queryState,
  classes = {},
  messages,
  children,
  filterFn,
}: Props<T>) {
  const { container = "" } = classes;
  const { isLoading, error, data } = queryState;

  if (isLoading) {
    return renderMessage(
      (msg) => <LoadingStatus>{msg || "Loading.."}</LoadingStatus>,
      messages.loading,
      container
    );
  }
  if (!!error || !data) {
    return renderMessage(
      (msg) => <ErrorStatus>{msg || "Failed to get data"}</ErrorStatus>,
      messages.error,
      container
    );
  }

  if (Array.isArray(data)) {
    if (isEmpty(data)) {
      return renderMessage(
        (msg) => <Status icon="Info">{msg || "No data"}</Status>,
        messages.empty,
        container
      );
    }

    if (filterFn) {
      const filtered = data.filter(filterFn);
      if (isEmpty(filtered)) {
        return renderMessage(
          (msg) => <Status icon="Info">{msg || "No data"}</Status>,
          messages.empty,
          container
        );
      }

      return children(filtered as unknown as NonNullable<T>);
    }
  }

  return children(data as NonNullable<T>);
}

function renderMessage(
  fallback: (message?: string) => ReactElement,
  message?: string | ReactElement,
  classes?: string
) {
  if (message == null || typeof message === "string") {
    return <div className={classes}>{fallback(message)}</div>;
  }
  return message;
}
