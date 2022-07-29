import { Component, ErrorInfo, PropsWithChildren } from "react";
import ErrorDisplayer from "./ErrorDisplayer";

type Props = PropsWithChildren<{}>;

type State = { error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {};

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    return (
      <ErrorDisplayer error={this.state.error}>
        {this.props.children}
      </ErrorDisplayer>
    );
  }
}
