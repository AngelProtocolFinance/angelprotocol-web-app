import { TxStep, isError, isLoading } from "slices/donation";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({
  classes = "",
  ...state
}: TxStep & { classes?: string }) {
  const { status } = state;
  if (isError(status)) {
    const { recipient } = state;
    return <Err {...status} classes={classes} endowId={recipient.id} />;
  } else if (isLoading(status)) {
    return <Loading message={status.loading} classes={classes} />;
  } else {
    return <Success classes={classes} {...state} hash={status.tx.hash} />;
  }
}
