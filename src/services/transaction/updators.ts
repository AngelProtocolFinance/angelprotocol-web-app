import { useSetter } from "store/accessors";
import { setStage } from "./transactionSlice";
import { StageUpdator } from "./types";

export default function useTxUpdator() {
  const dispatch = useSetter();

  const updateTx: StageUpdator = (update) => {
    dispatch(setStage(update));
  };

  return { updateTx };
}
