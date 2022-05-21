import { StageUpdator } from "slices/transaction/types";
import { useSetter } from "store/accessors";
import { setStage } from "./transactionSlice";

export default function useTxUpdator() {
  const dispatch = useSetter();

  const updateTx: StageUpdator = (update) => {
    dispatch(setStage(update));
  };

  return { updateTx };
}
