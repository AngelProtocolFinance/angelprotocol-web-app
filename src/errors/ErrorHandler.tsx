import { PropsWithChildren, useEffect } from "react";
import { useErrorContext } from "contexts/ErrorContext";

export default function ErrorHandler(
  props: PropsWithChildren<{
    error?: Error;
  }>
) {
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (props.error) {
      handleError(props.error.message);
    }
  }, [props.error, handleError]);

  return <>{props.children}</>;
}
