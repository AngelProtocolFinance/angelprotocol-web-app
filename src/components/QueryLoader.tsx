import Status, { ErrorStatus, LoadingStatus } from "components/Status";
import { isEmpty, logger } from "helpers";
import { ReactElement } from "react";
import { QueryState } from "types/third-party/redux";

type Props<T> = {
  queryState: QueryState<T>;
  messages?: {
    fetching?: string | ReactElement;
    loading?: string | ReactElement;
    error?: string | ReactElement;
    empty?: T extends any[] ? string | ReactElement : never;
  };
  dataRequired?: boolean;
  classes?: { container?: string };
  filterFn?: T extends (infer Item)[]
    ? (item: Item, idx: number) => boolean
    : never;
  children(data: NonNullable<T>): ReactElement;
};

export default function QueryLoader<T>({
  queryState,
  classes = {},
  messages = {},
  dataRequired = true,
  children,
  filterFn,
}: Props<T>) {
  const { container = "" } = classes;
  const { isLoading, isFetching, isError, data, error } = queryState;

  if (isLoading) {
    return renderMessage(
      (msg) => <LoadingStatus>{msg || "Loading.."}</LoadingStatus>,
      messages.loading,
      container
    );
  }
  if (isFetching && messages.fetching) {
    return renderMessage(
      (msg) => <LoadingStatus>{msg || "Loading.."}</LoadingStatus>,
      messages.fetching,
      container
    );
  }
  if (isError || (dataRequired && !data)) {
    if (isError) logger.error(error);
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
