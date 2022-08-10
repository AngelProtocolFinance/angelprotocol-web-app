import { createAsyncThunk } from "@reduxjs/toolkit";
import { TxLogPayload } from "types/server/aws";
import logDonation from "../logDonation";
import transactionSlice, { setStage } from "../transactionSlice";

//top level wrapper for delegated donation logs not in flow with chain tx
export const sendDonationLog = createAsyncThunk(
  `${transactionSlice.name}/sendDonationLog`,
  async (payload: TxLogPayload, { dispatch }) => {
    try {
      await logDonation(payload);
    } catch (err) {
      const destination = payload.charityId
        ? `charity:${payload.charityId}`
        : payload.fundId
        ? `fund:${payload.fundId}`
        : "destination";

      dispatch(
        setStage({
          step: "error",
          message: `Failed to direct transak order (${payload.transactionId}) to ${destination}. Please contact support@angelprotocol.io`,
        })
      );
    }
  }
);
