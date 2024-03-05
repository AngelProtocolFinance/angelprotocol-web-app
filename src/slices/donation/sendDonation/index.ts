import { createAsyncThunk } from "@reduxjs/toolkit";
import { chains } from "constants/chains";
import { APIs } from "constants/urls";
import { LogDonationFail } from "errors/errors";
import { logger } from "helpers";
import { sendTx } from "helpers/tx";
import { invalidateApesTags } from "services/apes";
import { CryptoDonation } from "types/aws";
import { isTxResultError } from "types/tx";
import donation, { setTxStatus } from "../donation";
import { DonateArgs, TxStatus } from "../types";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async (
    {
      donation: { details, recipient, liquidSplitPct, tip = 0, donor },
      ...txPackage
    },
    { dispatch }
  ) => {
    const chain = chains[details.chainId.value];
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };
    try {
      const { token } = details;
      updateTx({ loadingMsg: "Payment is being processed..." });

      const result = await sendTx(txPackage);

      if (isTxResultError(result)) {
        return updateTx("error");
      }
      const { hash } = result;

      updateTx({
        loadingMsg: "Saving donation details",
      });

      /** SAVE DONATION */
      const payload: CryptoDonation = {
        amount: +token.amount,
        tipAmount: tip,
        chainId: chain.id,
        chainName: chain.name,
        denomination: token.symbol,
        splitLiq: liquidSplitPct,
        transactionId: hash,
        walletAddress: txPackage.sender,
        endowmentId: recipient.id,
        appUsed: details.source,
        donor,
      };

      const response = await fetch(APIs.apes + "/crypto-donation", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new LogDonationFail(payload.chainId, payload.transactionId);
      }

      updateTx({ hash });
      //invalidate cache entries
      dispatch(invalidateApesTags(["tokens", "donations"]));
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);
