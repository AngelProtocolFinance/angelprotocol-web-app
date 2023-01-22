import { createAsyncThunk } from "@reduxjs/toolkit";
import { Estimate, TxStatus } from "../types";
import { DonateArgs } from "../types";
import { KYCData } from "types/aws";
import { TokenWithAmount } from "types/slices";
import { invalidateApesTags } from "services/apes";
import { logger } from "helpers";
import { sendTx } from "helpers/cosmos/sendTx";
import { chains } from "constants/chains";
import donation, { setTxStatus } from "../donation";
import logDonation from "./logDonation";

export const sendDonation = createAsyncThunk<void, DonateArgs>(
  `${donation.name}/sendDonation`,
  async ({ estimate, donation: { details, kyc, recipient } }, { dispatch }) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };

    try {
      const { wallet } = estimate;
      const chain = chains[wallet.chainId];
      const { token, pctLiquidSplit } = details;
      updateTx({ loadingMsg: "Payment is being processed..." });

      const { isSuccess, hash } = await sendTransaction(estimate, token);

      if (isSuccess) {
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
          chainId: wallet.chainId,
          chainName: chain.name,
          charityName: recipient.name,
          denomination: token.symbol,
          splitLiq: pctLiquidSplit,
          transactionId: hash,
          transactionDate: new Date().toISOString(),
          walletAddress: wallet.address,
          endowmentId: recipient.id,
        });

        updateTx({ hash });

        //invalidate cache entries
        dispatch(invalidateApesTags(["balances", "donations"]));
      } else {
        updateTx("error");
      }
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);

async function sendTransaction(
  estimate: Estimate,
  token: TokenWithAmount
): Promise<{ hash: string; isSuccess: boolean }> {
  switch (estimate.type) {
    case "cosmos": {
      const { doc, wallet } = estimate;
      const res = await sendTx(wallet, doc);
      return { hash: res.txhash, isSuccess: !res.code };
    }
    case "terra": {
      const { wallet, tx } = estimate;
      const response = await wallet.post(tx);
      return { hash: response.result.txhash, isSuccess: response.success };
    }
    //evm donations
    default: {
      const { wallet, tx } = estimate;
      const hash = await wallet.provider.request<string>({
        method: "eth_sendTransaction",
        params: [tx],
      });
      return {
        hash: hash,
        isSuccess: true /** just set to true, let top catch handle eth error */,
      };
    }
  }
}
