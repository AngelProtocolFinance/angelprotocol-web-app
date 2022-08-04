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
      // field 'dismissable' shouldn't appear in errors catched by ErrorBoundary as APError can
      // only be thrown from inside event handlers/async function and other components that cannot
      // be caught by the boundary
      // see docs for more details: https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
      handleError(props.error.message);
    }
  }, [props.error, handleError]);

  return <>{props.children}</>;
}
