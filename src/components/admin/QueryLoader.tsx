import { ReactElement } from "react";
import Icon from "components/Icon";

export function QueryLoader<T>(props: {
  queryState: { data?: T; isLoading: boolean; isError: boolean };
  messages: { loading?: string; error?: string };
  classes?: { container?: string };
  children(data: NonNullable<T>): ReactElement;
}) {
  const { isLoading, isError, data } = props.queryState;

  if (isLoading) {
    return (
      <p
        className={`flex gap-2 text-zinc-50/80 ${
          props.classes?.container || ""
        }`}
      >
        <Icon type="Loading" className="animate-spin relative top-1" />
        <span>{props.messages.loading || "Loading.."}</span>
      </p>
    );
  }
  if (isError || !data) {
    return (
      <p
        className={`flex gap-2 text-rose-300 ${props.classes?.container || ""}`}
      >
        <Icon type="Info" className="relative top-1" />
        <span>{props.messages.error || "Failed to get data"}</span>
      </p>
    );
  }

  return props.children(data as NonNullable<T>);
}
