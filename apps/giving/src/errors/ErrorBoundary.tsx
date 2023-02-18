import { ModalContext } from "@ap/contexts";
import { ErrorContext } from "@ap/contexts";
import { logger } from "@ap/helpers";
import { Component, ErrorInfo, PropsWithChildren } from "react";
import ErrorHandler from "./ErrorHandler";

type Props = PropsWithChildren;

type State = { error: Error | undefined };

// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
export default class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Caught error:", error, errorInfo);
  }

  override render() {
    return (
      <ModalContext>
        <ErrorContext>
          <ErrorHandler error={this.state.error}>
            {this.props.children}
          </ErrorHandler>
        </ErrorContext>
      </ModalContext>
    );
  }
}
