import { Component, ErrorInfo, PropsWithChildren } from "react";
import logger from "helpers/logger";
import ErrorContext from "../contexts/ErrorContext";
import ErrorHandler from "./ErrorHandler";

type Props = PropsWithChildren<{}>;

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
    logger.error("Caught error:", error, errorInfo);
  }

  render() {
    return (
      <ErrorContext>
        <ErrorHandler error={this.state.error}>
          {this.props.children}
        </ErrorHandler>
      </ErrorContext>
    );
  }
}
