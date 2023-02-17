import { useErrorContext } from "@/contexts/ErrorContext";
import { PropsWithChildren, useEffect } from "react";

export default function ErrorHandler(
  props: PropsWithChildren<{
    error?: Error;
  }>
) {
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (props.error) {
      handleError(props.error);
    }
  }, [props.error, handleError]);

  return <>{props.children}</>;
}
