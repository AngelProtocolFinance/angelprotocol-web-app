import { createAsyncThunk } from "@reduxjs/toolkit";
import { TxLogPayload } from "services/apes/types";
import logDonation from "helpers/logDonation";
import transactionSlice, { setStage } from "../transactionSlice";
import { Step } from "../types";

//top level wrapper for delegated donation logs not in flow with chain tx
export const sendDonationLog = createAsyncThunk(
  `${transactionSlice.name}/sendDonationLog`,
  async (payload: TxLogPayload, { dispatch }) => {
    try {
      await logDonation(payload);
    } catch (err) {
      dispatch(
        setStage({
          step: Step.error,
          message: "Failed to log transak order",
        })
      );
    }
  }
);
