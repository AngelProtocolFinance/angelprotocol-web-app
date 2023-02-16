import { createAsyncThunk } from "@reduxjs/toolkit";
import { Estimate, TxStatus } from "../types";
import { DonateArgs } from "../types";
import { KYCData } from "types/aws";
import { invalidateApesTags } from "services/apes";
import { processError } from "hooks/useErrorHandler";
import { sendTx } from "helpers/cosmos/sendTx";
import { chains } from "constants/chains";
import { EIPMethods } from "constants/ethereum";
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
      updateTx({ loading: "Payment is being processed..." });

      const hash = await sendTransaction(estimate);

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
        loading:
          kyc !== "skipped"
            ? "Requesting receipt.."
            : "Saving donation details",
      });

      /** TODO: include receipt failure in result tab
       *  show link of succesful tx
       */
      await logDonation({
        ...kycData /** receipt is sent to user if kyc is provider upfront */,
        amount: +token.amount,
        chainId: wallet.chainId,
        chainName: chain.name,
        charityName: recipient.name,
        denomination: token.symbol,
        splitLiq: `${pctLiquidSplit}`,
        transactionId: hash,
        transactionDate: new Date().toISOString(),
        walletAddress: wallet.address,
        endowmentId: recipient.id,
      });

      updateTx({ tx: { hash, chainId: wallet.chainId } });
      //invalidate cache entries
      dispatch(invalidateApesTags(["balances", "donations"]));
    } catch (err) {
      const error = processError(err, "sendDonation.ts");
      updateTx({ error: error.message });
    }
  }
);

async function sendTransaction(estimate: Estimate): Promise<string> {
  switch (estimate.type) {
    case "cosmos": {
      const { doc, wallet } = estimate;
      const res = await sendTx(wallet, doc);
      return res.txhash;
    }
    case "terra": {
      const { wallet, tx } = estimate;
      const response = await wallet.post(tx);
      return response.result.txhash;
    }
    //evm donations
    default: {
      const { wallet, tx } = estimate;
      const hash = await wallet.provider.request<string>({
        method: EIPMethods.eth_sendTransaction,
        params: [tx],
      });
      return hash;
    }
  }
}
