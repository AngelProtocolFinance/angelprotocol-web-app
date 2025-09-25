import { ErrorStatus, LoadingStatus, Status } from "components/status";
import { CircleAlert } from "lucide-react";
import type { ReactElement } from "react";
import type { QueryState } from "types/components";

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

export function QueryLoader<T>({
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
    return render_msg(
      (msg) => <LoadingStatus>{msg || "Loading.."}</LoadingStatus>,
      messages.loading,
      container
    );
  }
  if (isFetching && messages.fetching) {
    return render_msg(
      (msg) => <LoadingStatus>{msg || "Loading.."}</LoadingStatus>,
      messages.fetching,
      container
    );
  }
  if (isError || (dataRequired && !data)) {
    if (isError) console.error(error);
    return render_msg(
      (msg) => <ErrorStatus>{msg || "Failed to get data"}</ErrorStatus>,
      messages.error,
      container
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return render_msg(
        (msg) => <Status icon={<CircleAlert />}>{msg || "No data"}</Status>,
        messages.empty,
        container
      );
    }

    if (filterFn) {
      const filtered = data.filter(filterFn);
      if (filtered.length === 0) {
        return render_msg(
          (msg) => <Status icon={<CircleAlert />}>{msg || "No data"}</Status>,
          messages.empty,
          container
        );
      }

      return children(filtered as unknown as NonNullable<T>);
    }
  }

  return children(data as NonNullable<T>);
}

function render_msg(
  fallback: (message?: string) => ReactElement,
  message?: string | ReactElement,
  classes?: string
) {
  if (message == null || typeof message === "string") {
    return <div className={classes}>{fallback(message)}</div>;
  }
  return message;
}
