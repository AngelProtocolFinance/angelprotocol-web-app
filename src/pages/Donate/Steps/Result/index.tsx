import { TxStep } from "slices/donation";

export default function Result({ status }: TxStep) {
  if (status === "error") {
    return <div>error</div>;
  } else if ("loadingMsg" in status) {
    return <div>{status.loadingMsg}</div>;
  } else {
    return <div>{status.hash}</div>;
  }
}
