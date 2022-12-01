import { GiftCard, TxResult, TxStep } from "slices/gift";
import { errKey, loadingKey } from "../constants";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

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
