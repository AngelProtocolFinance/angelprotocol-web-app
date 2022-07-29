import { Component, ErrorInfo, PropsWithChildren } from "react";
import Icon from "components/Icon";

type Props = PropsWithChildren<{}>;

type State = { error?: Error };

// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
export default class ErrorBoundary extends Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <Icon type="Warning" className="text-2xl" />
          <span>Something went wrong</span>
          <span>
            Please reload the page and if the error persists, contact
            support@angelprotocol.io
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}
