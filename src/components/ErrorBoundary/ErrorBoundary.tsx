import { Component, ErrorInfo, FC, PropsWithChildren } from "react";
import { logger } from "helpers";
import Fallback from "./Fallback";

export type TFallback = FC<{ error: Error; classes?: string }>;

export type Props = PropsWithChildren<{
  classes?: string;
  fallback?: TFallback;
}>;

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
      const { fallback: CustomFallBack = Fallback } = this.props;
      return (
        <CustomFallBack error={this.state.error} classes={this.props.classes} />
      );
    }

    return this.props.children;
  }
}
