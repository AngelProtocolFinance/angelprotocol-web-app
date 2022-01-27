import { useSetter } from "store/accessors";
import {
  setFee,
  setStage,
  setFormError,
  setFormLoading,
} from "./transactionSlice";
import { StageUpdator } from "./types";

export default function useTxUpdator() {
  const dispatch = useSetter();
  const updateTx: StageUpdator = (update) => {
    dispatch(setStage(update));
  };
  const setTxFee = (fee: number) => {
    dispatch(setFee(fee));
  };

  const setTxError = (error: string) => {
    dispatch(setFormError(error));
  };

  const simulateTx = () => {
    dispatch(setFormLoading(true));
  };

  const endSimulation = () => {
    dispatch(setFormLoading(true));
  };

  return { updateTx };
}
