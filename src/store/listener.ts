import { createListenerMiddleware } from "@reduxjs/toolkit";
import { modalClosed } from "contexts/ModalContext";
import { resetTxFormState } from "slices/transaction/transactionSlice";
import { RootState } from "./store";

export const listener = createListenerMiddleware();
listener.startListening({
  actionCreator: modalClosed,
  effect(action, { dispatch, cancelActiveListeners, getState }) {
    const state = getState() as RootState;
    switch (state.transaction.stage.step) {
      case "success":
      case "error":
        dispatch(resetTxFormState());
    }
    cancelActiveListeners();
  },
});
