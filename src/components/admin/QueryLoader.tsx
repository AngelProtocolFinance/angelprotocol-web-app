import { ReactElement } from "react";
import Icon from "components/Icon";

type Props<T> = {
  queryState: { data?: T; isLoading: boolean; isError: boolean };
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
  classes,
  messages,
  children,
  filterFn,
}: Props<T>) {
  const { isLoading, isError, data } = queryState;

  if (isLoading) {
    return (
      <div className={`flex gap-2 text-white/80 ${classes?.container || ""}`}>
        <Icon type="Loading" className="animate-spin relative top-1" />
        <span>{messages.loading || "Loading.."}</span>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className={`flex gap-2 text-rose-300 ${classes?.container || ""}`}>
        <Icon type="Info" className="relative top-1" />
        <span>{messages.error || "Failed to get data"}</span>
      </div>
    );
  }

  if (Array.isArray(data)) {
    if (data.length <= 0) {
      return (
        <div className={`flex gap-2 text-white/80 ${classes?.container || ""}`}>
          <Icon type="Info" className="relative top-1" />
          <span>{messages.empty || "No data"}</span>
        </div>
      );
    }

    if (filterFn) {
      const filtered = data.filter(filterFn);
      if (filtered.length <= 0) {
        return (
          <div
            className={`flex gap-2 text-white/80 ${classes?.container || ""}`}
          >
            <Icon type="Info" className="relative top-1" />
            <span>{messages.empty || "No data"}</span>
          </div>
        );
      }

      return children(filtered as unknown as NonNullable<T>);
    }
  }

  return children(data as NonNullable<T>);
}
