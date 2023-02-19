import Status, { ErrorStatus, LoadingStatus } from "@ap/components/status";
import { isEmpty } from "@ap/helpers";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { TypedUseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ReactElement } from "react";

type Base = BaseQueryFn<any, unknown, unknown, any, any>;
type QueryState<T> = Pick<
  TypedUseQueryHookResult<T, any, Base>,
  "isLoading" | "isError" | "data"
>;

type Props<T> = {
  queryState: QueryState<T>;
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

export default function QueryLoader<T>({
  queryState,
  classes = {},
  messages,
  children,
  filterFn,
}: Props<T>) {
  const { container = "" } = classes;
  const { isLoading, isError, data } = queryState;

  if (isLoading) {
    return renderMessage(
      (msg) => <LoadingStatus>{msg || "Loading.."}</LoadingStatus>,
      messages.loading,
      container
    );
  }
  if (isError || !data) {
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
      if (isEmpty(data)) {
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
