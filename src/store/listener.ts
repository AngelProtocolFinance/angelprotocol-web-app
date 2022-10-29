import { createListenerMiddleware } from "@reduxjs/toolkit";
import { modalClosed } from "contexts/ModalContext";
import { TransactorName } from "components/Transactor";
import { TransactionPromptName } from "components/Transactor/TransactionPrompt";
import { resetTxFormState } from "slices/transaction/transactionSlice";
import { RootState } from "./store";

export const listener = createListenerMiddleware();
listener.startListening({
  actionCreator: modalClosed,
  effect({ payload: key }, { dispatch, cancelActiveListeners, getState }) {
    const state = getState() as RootState;
    if (key === TransactionPromptName || key === TransactorName) {
      switch (state.transaction.stage.step) {
        case "success":
        case "error":
          dispatch(resetTxFormState());
      }
    }

    cancelActiveListeners();
  },
});
