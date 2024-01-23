import { CryptoResultStep } from "slices/donation";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({
  classes = "",
  ...state
}: CryptoResultStep & { classes?: string }) {
  const { status } = state;
  if (status === "error") {
    const { recipient } = state;
    return <Err classes={classes} endowId={recipient.id} />;
  } else if ("loadingMsg" in status) {
    return <Loading message={status.loadingMsg} classes={classes} />;
  } else {
    return <Success classes={classes} {...state} hash={status.hash} />;
  }
}
