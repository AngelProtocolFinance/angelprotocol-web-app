import { Component, ErrorInfo, PropsWithChildren } from "react";
import { setContext } from "contexts/ModalContext";
import Popup from "components/Popup";

type Props = PropsWithChildren<{}>;

type State = { error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  static contextType = setContext;

  public state: State = {};

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      this.context.showModal(Popup, { message: this.state.error.message });
    }

    return this.props.children;
  }
}
