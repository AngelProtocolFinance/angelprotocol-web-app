import { ReceiptStage, Step } from "services/transaction/types";
import { ReactNode } from "react";
import Receipter from "./Receipter";

export default function TransactionReceipter(
  props: { children: ReactNode } & ReceiptStage
) {
  //need a guarantee that this component is called when stage is Receipt
  if (props.step !== Step.receipt) throw new Error("wrong component rendered");

  return <Receipter {...props} />;
}
