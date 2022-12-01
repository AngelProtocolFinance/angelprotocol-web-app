import { GiftCard, TError, TLoading, TxResult, TxStep } from "slices/gift";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

const loadingKey: keyof TLoading = "msg";
const errKey: keyof TError = "error";

export default function Result({
  classes = "",
  ...state
}: TxStep & { classes?: string }) {
  const { status } = state;
  if (errKey in status) {
    return <Err classes={classes} msg={status.error} />;
  } else if (loadingKey in status) {
    return <Loading message={status.msg} classes={classes} />;
  } else {
    return (
      <Success classes={classes} {...(state.status as GiftCard | TxResult)} />
    );
  }
}
