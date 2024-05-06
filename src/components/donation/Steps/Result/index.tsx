import type { CryptoResultStep } from "../types";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({
  classes = "",
  ...state
}: CryptoResultStep & { classes?: string }) {
  if (state.status === "error") {
    const { recipient } = state;
    return <Err classes={classes} endowId={recipient.id} />;
  }

  if ("loadingMsg" in state.status) {
    const { loadingMsg } = state.status;
    return <Loading message={loadingMsg} classes={classes} />;
  }
  const { status, recipient } = state;
  return (
    <Success
      classes={classes}
      recipient={recipient}
      guestDonor={status.guestDonor}
    />
  );
}
