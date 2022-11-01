import { TxStep } from "slices/donation";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({
  classes = "",
  recipient,
  status,
}: TxStep & { classes?: string }) {
  if (status === "error") {
    return <Err classes={classes} endowId={recipient.id} />;
  } else if ("loadingMsg" in status) {
    return <Loading message={status.loadingMsg} classes={classes} />;
  } else {
    return <Success classes={classes} endowId={recipient.id} />;
  }
}
