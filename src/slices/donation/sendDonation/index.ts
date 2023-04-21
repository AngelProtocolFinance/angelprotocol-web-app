import { createAsyncThunk } from "@reduxjs/toolkit";
import { DonateArgs, FiatDonateArgs, TxStatus } from "../types";
import { KYCData } from "types/aws";
import { isTxResultError } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { logger } from "helpers";
import { sendTx } from "helpers/tx";
import { SERVICE_PROVIDER } from "constants/fiatTransactions";
import donation, { setTxStatus } from "../donation";
import logDonation from "./logDonation";
import logFiatDonation from "./logFiatDonation";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async (
    { wallet, tx, donation: { details, kyc, recipient } },
    { dispatch }
  ) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };
    try {
      const { token, pctLiquidSplit } = details;
      updateTx({ loadingMsg: "Payment is being processed..." });

      const result = await sendTx(wallet, tx);

      if (isTxResultError(result)) {
        return updateTx("error");
      }
      const { hash } = result;

      const kycData: KYCData | undefined =
        kyc === "skipped"
          ? undefined
          : {
              fullName: `${kyc.name.first} ${kyc.name.last}`,
              email: kyc.email,
              streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
              city: kyc.city,
              state: kyc.usState.value || kyc.state,
              zipCode: kyc.postalCode,
              country: kyc.country.name,
              consent_tax: true,
              consent_marketing: true,
            };

      updateTx({
        loadingMsg:
          kyc !== "skipped"
            ? "Requesting receipt.."
            : "Saving donation details",
      });

      await logDonation({
        ...kycData /** receipt is sent to user if kyc is provider upfront */,
        amount: +token.amount,
        chainId: wallet.chain.chain_id,
        chainName: wallet.chain.chain_name,
        charityName: recipient.name,
        denomination: token.symbol,
        splitLiq: `${pctLiquidSplit}`,
        transactionId: hash,
        transactionDate: new Date().toISOString(),
        walletAddress: wallet.address,
        endowmentId: recipient.id,
      });

      updateTx({ hash });

      //invalidate cache entries
      dispatch(invalidateApesTags(["chain", "donations"]));
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);

export const sendFiatDonation = createAsyncThunk<void, FiatDonateArgs>(
  `${donation.name}/sendFiatDonation`,
  async (
    { wallet, externalSessionId, donation: { details, kyc, recipient } },
    { dispatch }
  ) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };

    try {
      const { token, pctLiquidSplit } = details;
      updateTx({ loadingMsg: "Payment is being processed..." });

      const kycData: KYCData | undefined =
        kyc === "skipped"
          ? undefined
          : {
              fullName: `${kyc.name.first} ${kyc.name.last}`,
              email: kyc.email,
              streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
              city: kyc.city,
              state: kyc.usState.value || kyc.state,
              zipCode: kyc.postalCode,
              country: kyc.country.name,
              consent_tax: true,
              consent_marketing: true,
            };

      updateTx({
        loadingMsg:
          kyc !== "skipped"
            ? "Requesting receipt.."
            : "Saving donation details",
      });

      await logFiatDonation({
        ...kycData /** receipt is sent to user if kyc is provider upfront */,
        amount: +token.amount,
        chainId: wallet.chain.chain_id,
        chainName: wallet.chain.chain_name,
        charityName: recipient.name,
        denomination: token.symbol,
        splitLiq: `${pctLiquidSplit}`,
        transactionId: externalSessionId,
        transactionDate: new Date().toISOString(),
        endowmentId: recipient.id,
        fiatRamp: SERVICE_PROVIDER,
        paymentMethod: externalSessionId,
        destinationChainId: "juno-1",
      });

      //need to create an additional state for submitted fiat txn
      updateTx({ hash: "Transaction Submitted" });

      //invalidate cache entries
      dispatch(invalidateApesTags(["chain", "donations"]));
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);
