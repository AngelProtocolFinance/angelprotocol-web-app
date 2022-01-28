import { useEffect } from "react";
import { useSetter } from "store/accessors";
import { setStage } from "./transactionSlice";
import { StageUpdator, Step } from "./types";

export default function useTxUpdator() {
  const dispatch = useSetter();

  const updateTx: StageUpdator = (update) => {
    dispatch(setStage(update));
  };

  return { updateTx };
}
