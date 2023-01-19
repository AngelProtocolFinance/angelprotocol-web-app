import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { TypedUseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ReactElement } from "react";
import Icon from "components/Icon";
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
        <Icon
          type="Loading"
          className="animate-spin inline relative mr-1 bottom-[1px]"
        />
        <span>{messages.loading || "Loading.."}</span>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className={container}>
        <Icon
          type="Info"
          className="inline relative mr-1 bottom-[1px] text-red dark:text-red-l2"
        />
        <span className="text-red dark:text-red-l2">
          {messages.error || "Failed to get data"}
        </span>
      </div>
    );
  }

  if (Array.isArray(data)) {
    if (isEmpty(data)) {
      return (
        <div className={container}>
          <Icon type="Info" className="inline relative mr-1 bottom-[1px]" />
          <span>{messages.empty || "No data"}</span>
        </div>
      );
    }

    if (filterFn) {
      const filtered = data.filter(filterFn);
      if (isEmpty(data)) {
        return (
          <div className={container}>
            <Icon type="Info" className="inline relative mr-1 bottom-[1px]" />
            <span>{messages.empty || "No data"}</span>
          </div>
        );
      }

      return children(filtered as unknown as NonNullable<T>);
    }
  }

  return children(data as NonNullable<T>);
}
