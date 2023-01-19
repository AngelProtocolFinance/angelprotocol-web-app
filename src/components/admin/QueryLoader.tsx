import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { TypedUseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ReactElement } from "react";
import Status, { ErrorStatus, LoadingStatus } from "components/Status";
import { isEmpty } from "helpers";

type Base = BaseQueryFn<any, unknown, unknown, {}, {}>;
export type QueryState<T> = Pick<
  TypedUseQueryHookResult<T, any, Base>,
  "isLoading" | "isError" | "data"
>;

type Props<T> = {
  queryState: QueryState<T>;
  messages: {
    loading?: string;
    error?: string;
    empty?: T extends any[] ? string : never;
  };
  classes?: { container?: string };
  filterFn?: T extends (infer Item)[]
    ? (item: Item, idx: number) => boolean
    : never;
  children(data: NonNullable<T>): ReactElement;
};

export function QueryLoader<T>({
  queryState,
  classes = {},
  messages,
  children,
  filterFn,
}: Props<T>) {
  const { container = "" } = classes;
  const { isLoading, isError, data } = queryState;

  if (isLoading) {
    return (
      <div className={container}>
        <LoadingStatus>{messages.loading || "Loading.."}</LoadingStatus>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className={container}>
        <ErrorStatus>{messages.error || "Failed to get data"}</ErrorStatus>
      </div>
    );
  }

  if (Array.isArray(data)) {
    if (isEmpty(data)) {
      return (
        <div className={container}>
          <Status icon="Info">{messages.empty || "No data"}</Status>
        </div>
      );
    }

    if (filterFn) {
      const filtered = data.filter(filterFn);
      if (isEmpty(data)) {
        return (
          <div className={container}>
            <Status icon="Info">{messages.empty || "No data"}</Status>
          </div>
        );
      }

      return children(filtered as unknown as NonNullable<T>);
    }
  }

  return children(data as NonNullable<T>);
}
