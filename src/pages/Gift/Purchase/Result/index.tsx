import { TxStep } from "slices/gift";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({
  classes = "",
  ...state
}: TxStep & { classes?: string }) {
  const { status } = state;
  if (status === "error") {
    return <Err classes={classes} />;
  } else if ("loadingMsg" in status) {
    return <Loading message={status.loadingMsg} classes={classes} />;
  } else {
    return <Success classes={classes} {...state} code={status.code} />;
  }
}
