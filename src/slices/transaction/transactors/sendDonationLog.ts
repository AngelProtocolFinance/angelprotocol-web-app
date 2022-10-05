import { createAsyncThunk } from "@reduxjs/toolkit";
import { TxLogPayload } from "types/aws";
import logDonation from "../logDonation";
import transactionSlice, { setStage } from "../transactionSlice";

//top level wrapper for delegated donation logs not in flow with chain tx
export const sendDonationLog = createAsyncThunk(
  `${transactionSlice.name}/sendDonationLog`,
  async (payload: TxLogPayload, { dispatch }) => {
    try {
      await logDonation(payload);
    } catch (err) {
      dispatch(
        setStage({
          step: "error",
          message: `Failed to log donation (${payload.transactionId}) to charity:${payload.charityId}. Please contact support@angelprotocol.io`,
        })
      );
    }
  }
);
