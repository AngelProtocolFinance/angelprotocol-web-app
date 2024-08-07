import { logger } from "helpers";
import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { useRouteError } from "react-router-dom";
import DefaultFallback from "./DefaultFallback";

type Props = PropsWithChildren<{ fallback?: ReactNode }>;

type State = { error: Error | undefined };

// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(error);
    logger.error(errorInfo);
  }

  render() {
    return this.state.error
      ? this.props.fallback || <DefaultFallback />
      : this.props.children;
  }
}

export function RouterErrorBoundary() {
  const error = useRouteError();
  logger.error(error);
  return <DefaultFallback />;
}
