import { createAsyncThunk } from "@reduxjs/toolkit";
import { DonateArgs, TxStatus, isFiat } from "../types";
import { KYCData, TxLogPayload } from "types/aws";
import { isTxResultError } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { client, network } from "services/constants";
import { version as v } from "services/helpers";
import { createAuthToken, logger } from "helpers";
import { sendTx } from "helpers/tx";
import { LogDonationFail } from "errors/errors";
import { chainIds } from "constant/chainIds";
import { APIs } from "constant/urls";
// import { SERVICE_PROVIDER } from "constant/fiatTransactions";
import donation, { setTxStatus } from "../donation";

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

      const authToken = createAuthToken("angelprotocol-web-app");
      if (isFiat(wallet) || token.type === "fiat") {
        const { widgetUrl } = await fetch(
          `${APIs.apes}/${v(2)}/fiat/meld-widget-proxy/${client}/${network}`,
          {
            method: "POST",
            headers: { authorization: authToken },
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

      const kycData: KYCData | undefined = kyc
        ? {
            fullName: `${kyc.name.first} ${kyc.name.last}`,
            email: kyc.email,
            streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
            city: kyc.city,
            state: kyc.usState.value || kyc.state,
            zipCode: kyc.postalCode,
            country: kyc.country.name,
            consent_tax: true,
            consent_marketing: true,
          }
        : undefined;

      updateTx({
        loadingMsg: kyc ? "Requesting receipt.." : "Saving donation details",
      });

      /** SAVE DONATION */
      const payload: TxLogPayload = {
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
      };

      const response = await fetch(APIs.apes + `/${v(4)}/donation/${client}`, {
        method: "POST",
        headers: { authorization: authToken },
        body: JSON.stringify({
          ...payload,
          ...payload.kycData,
          //helps AWS determine which txs are testnet and mainnet without checking all chainIDs
          network,
        }),
      });

      if (!response.ok) {
        throw new LogDonationFail(payload.chainId, payload.transactionId);
      }

      updateTx({ hash });
      //invalidate cache entries
      dispatch(invalidateApesTags(["chain", "donations"]));
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);
