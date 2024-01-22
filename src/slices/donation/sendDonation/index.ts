import { createAsyncThunk } from "@reduxjs/toolkit";
import { DonateArgs, TxStatus } from "../types";
import { CryptoDonation, KYCData } from "types/aws";
import { isTxResultError } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { version as v } from "services/helpers";
import { logger } from "helpers";
import { sendTx } from "helpers/tx";
import { LogDonationFail } from "errors/errors";
import { chains } from "constants/chains";
import { APIs } from "constants/urls";
import donation, { setTxStatus } from "../donation";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async (
    { donation: { details, kyc, recipient }, ...txPackage },
    { dispatch }
  ) => {
    const chain = chains[details.chainId.value];
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };
    try {
      const { token, pctLiquidSplit } = details;
      updateTx({ loadingMsg: "Payment is being processed..." });

      const result = await sendTx(txPackage);

      if (isTxResultError(result)) {
        return updateTx("error");
      }
      const { hash } = result;

      const kycData: KYCData | undefined = kyc
        ? {
            fullName: `${kyc.name.first} ${kyc.name.last}`,
            kycEmail: kyc.kycEmail,
            streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
            city: kyc.city,
            state: kyc.usState.value || kyc.state,
            zipCode: kyc.postalCode,
            country: kyc.country.name,
          }
        : undefined;

      updateTx({
        loadingMsg: kyc ? "Requesting receipt.." : "Saving donation details",
      });

      /** SAVE DONATION */
      const payload: CryptoDonation = {
        kyc: kycData /** receipt is sent to user if kyc is provider upfront */,
        amount: +token.amount,
        chainId: chain.id,
        chainName: chain.name,
        denomination: token.symbol,
        splitLiq: pctLiquidSplit,
        transactionId: hash,
        walletAddress: txPackage.sender,
        endowmentId: recipient.id,
        appUsed: details.source,
      };

      const response = await fetch(APIs.apes + `/${v(1)}/donations`, {
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
