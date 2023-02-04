import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";
import { logger } from "helpers";

type Props = PropsWithChildren<{ fallback: ReactNode }>;

type State = { error: Error | undefined };

// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
