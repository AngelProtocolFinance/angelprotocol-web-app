import { createAsyncThunk } from "@reduxjs/toolkit";
import { EstimatedTx, TxStatus } from "../types";
import { DonateArgs } from "../types";
import { KYCData } from "types/aws";
import { invalidateApesTags } from "services/apes";
import { WalletState } from "contexts/WalletContext";
import Contract from "contracts/Contract";
import { getProvider, logger } from "helpers";
import { EIPMethods } from "constants/evm";
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

      const { isSuccess, hash } = await sendTransaction(tx, wallet);

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
  tx: EstimatedTx,
  wallet: WalletState
): Promise<{ hash: string; isSuccess: boolean }> {
  switch (tx.type) {
    case "cosmos": {
      const contract = new Contract(wallet);
      const response = await contract.signAndBroadcast(tx.val);
      return { hash: response.transactionHash, isSuccess: !response.code };
    }
    case "terra": {
      const response = await tx.wallet.post(tx.val);
      return { hash: response.result.txhash, isSuccess: response.success };
    }
    //evm donations
    default: {
      const provider = getProvider(wallet.providerId)!;
      const hash = await provider.request<string>({
        method: EIPMethods.eth_sendTransaction,
        params: [tx.val],
      });
      return {
        hash,
        isSuccess: true,
      } /** just set to true, let top catch handle eth error */;
    }
  }
}
