import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIds } from "constants/chainIds";
import { chains } from "constants/chains";
import { APIs } from "constants/urls";
import { LogDonationFail } from "errors/errors";
import { logger } from "helpers";
import { sendTx } from "helpers/tx";
import { invalidateApesTags } from "services/apes";
import { apiEnv } from "services/constants";
import { version as v } from "services/helpers";
import { KYCData, TxLogPayload } from "types/aws";
import { isTxResultError } from "types/tx";
import donation, { setTxStatus } from "../donation";
import { DonateArgs, TxStatus } from "../types";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async (
    { donation: { details, kyc, recipient }, ...txPackage },
    { dispatch },
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
      const payload: TxLogPayload = {
        ...kycData /** receipt is sent to user if kyc is provider upfront */,
        amount: +token.amount,
        chainId: chain.id,
        destinationChainId: chainIds.polygon,
        chainName: chain.name,
        charityName: recipient.name,
        denomination: token.symbol,
        splitLiq: `${pctLiquidSplit}`,
        transactionId: hash,
        transactionDate: new Date().toISOString(),
        walletAddress: txPackage.sender,
        endowmentId: recipient.id,
      };

      const response = await fetch(APIs.apes + `/${v(4)}/donation/apes`, {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          ...payload.kycData,
          //helps AWS determine which txs are testnet and mainnet without checking all chainIDs
          network: apiEnv,
        }),
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
  },
);
