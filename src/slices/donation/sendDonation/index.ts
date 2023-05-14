import { createAsyncThunk } from "@reduxjs/toolkit";
import { DonateArgs, TxStatus, isFiat } from "../types";
import { KYCData } from "types/aws";
import { isTxResultError } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { createAuthToken, logger } from "helpers";
import { sendTx } from "helpers/tx";
import { chainIds } from "constants/chainIds";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
// import { SERVICE_PROVIDER } from "constants/fiatTransactions";
import donation, { setTxStatus } from "../donation";
import logDonation from "./logDonation";

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

      if (isFiat(wallet) || token.type === "fiat") {
        const auth = createAuthToken("angelprotocol-web-app");
        const { widgetUrl } = await fetch(
          `${APIs.apes}/v1/fiat/meld-widget-proxy/${
            IS_TEST ? "testnet" : "mainnet"
          }`,
          {
            method: "POST",
            headers: { authorization: auth },
            body: JSON.stringify({
              amount: +token.amount,
              charityName: recipient.name,
              countryCode: details.country.code,
              endowmentId: recipient.id,
              sourceCurrencyCode: token.symbol,
              splitLiq: details.pctLiquidSplit.toString(),
            }),
          }
        ).then<{ widgetUrl: string }>((res) => {
          if (!res.ok) throw new Error("Failed to get widget url");
          return res.json();
        });

        updateTx({ loadingMsg: "Redirecting..." });
        window.location.href = widgetUrl;
        return;
      }

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
        destinationChainId: chainIds.polygon,
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
