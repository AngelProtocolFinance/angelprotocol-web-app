import { createAsyncThunk } from "@reduxjs/toolkit";
import { logger } from "helpers";
import { sendTx } from "helpers/tx";
import { invalidateApesTags } from "services/apes";
import { invalidateAwsTags } from "services/aws/aws";
import { isTxResultError } from "types/tx";
import donation, { setTxStatus } from "../donation";
import type { DonateArgs, TxStatus } from "../types";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async ({ onSuccess, ...txPackage }, { dispatch }) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };
    try {
      updateTx({ loadingMsg: "Payment is being processed..." });

      const result = await sendTx(txPackage);

      if (isTxResultError(result)) {
        return updateTx("error");
      }
      const { hash } = result;

      updateTx({
        loadingMsg: "Saving donation details",
      });

      /** CONFIRM DONATION */
      const { guestDonor } = await onSuccess(hash);

      updateTx({ hash, guestDonor });
      //invalidate cache entries
      dispatch(invalidateApesTags(["tokens"]));
      dispatch(invalidateAwsTags(["donations"]));
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);
