import { createListenerMiddleware } from "@reduxjs/toolkit";
import { modalTriggered } from "contexts/ModalContext";
import { TransactorName } from "components/Transactor";
import { TransactionPromptName } from "components/Transactor/TransactionPrompt";
import { resetTxFormState } from "slices/transaction/transactionSlice";
import { RootState } from "./store";

export const listener = createListenerMiddleware();
listener.startListening({
  actionCreator: modalTriggered,
  effect(
    { payload: { key, action } },
    { dispatch, cancelActiveListeners, getState }
  ) {
    const state = getState() as RootState;
    const isTransactor = key === TransactorName;
    const isHint = key === TransactionPromptName;

    switch (state.transaction.stage.step) {
      case "success":
      case "error":
        if (
          (action === "close" && (isTransactor || isHint)) ||
          (action === "open" && isTransactor)
        ) {
          dispatch(resetTxFormState());
        }
    }

    cancelActiveListeners();
  },
});
