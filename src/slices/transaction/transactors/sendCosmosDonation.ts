import { createAsyncThunk } from "@reduxjs/toolkit";
import { StageUpdater, TxOptions } from "../types";
import { KYCData, Receiver } from "types/aws";
import { apesTags, invalidateApesTags } from "services/apes";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { DonateValues } from "components/Transactors/Donater";
import logDonation from "slices/transaction/logDonation";
import Contract from "contracts/Contract";
import { WalletDisconnectedError } from "errors/errors";
import handleTxError from "../handleTxError";
import transactionSlice, { setStage } from "../transactionSlice";

type CosmosDonateArgs = {
  wallet?: WalletState;
  donateValues: DonateValues;
  tx: TxOptions;
  kycData?: KYCData;
};

export const sendCosmosDonation = createAsyncThunk(
  `${transactionSlice.name}/junoDonate`,
  async (args: CosmosDonateArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) throw new WalletDisconnectedError();
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const contract = new Contract(args.wallet);
      const response = await contract.signAndBroadcast(args.tx);

      if (!response.code) {
        updateStage({ step: "submit", message: "Saving donation details" });

        const { receiver, token, amount, split_liq } = args.donateValues;

        const receipient: Receiver =
          typeof receiver === "string"
            ? { charityId: receiver }
            : { fundId: receiver };

        if (typeof receiver !== "undefined") {
          await logDonation({
            ...receipient,
            ...args.kycData,
            transactionId: response.transactionHash,
            transactionDate: new Date().toISOString(),
            chainId: args.wallet.chain.chain_id,
            amount: +amount,
            denomination: token.symbol,
            splitLiq: split_liq,
            walletAddress: args.wallet.address,
          });
        }

        updateStage({
          step: "success",
          message: "Thank you for your donation",
          txHash: response.transactionHash,
          rawLog: response.rawLog,
          chain: args.wallet.chain,
          //share is enabled for both individual and tca donations
          isShareEnabled: true,
        });

        //invalidate user balance and endowment balance
        dispatch(invalidateApesTags([{ type: apesTags.chain }]));
      } else {
        updateStage({
          step: "error",
          message: "Transaction failed",
          txHash: response.transactionHash,
          chain: args.wallet.chain,
        });
      }
    } catch (err) {
      handleTxError(err, updateStage);
    }
  }
);
