import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";

export default function useTxErrorHandler() {
  const dispatch = useSetter();

  return function handleTxError(message: string, url?: string) {
    dispatch(setStage({ step: Step.error, content: { message, url } }));
  };
}
