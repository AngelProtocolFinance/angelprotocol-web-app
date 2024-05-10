import type { CryptoResultStep } from "../types";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({
  classes = "",
  ...state
}: CryptoResultStep & { classes?: string }) {
  if (state.status === "error") {
    return <Err classes={classes} {...state} />;
  }

  if ("loadingMsg" in state.status) {
    const { loadingMsg } = state.status;
    return <Loading message={loadingMsg} classes={classes} />;
  }
  const { status, init } = state;
  return (
    <Success
      classes={classes}
      recipient={init.recipient}
      guestDonor={status.guestDonor}
    />
  );
}
