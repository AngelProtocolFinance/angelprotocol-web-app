import { createAsyncThunk } from "@reduxjs/toolkit";
import { StageUpdater, TxOptions } from "../types";
import { KYCData, Receiver } from "types/server/aws";
import { invalidateJunoTags } from "services/juno";
import { VerifiedChain } from "contexts/ChainGuard";
import { DonateValues } from "components/Transactors/Donater";
import logDonation from "slices/transaction/logDonation";
import Contract from "contracts/Contract";
import handleTxError from "../handleTxError";
import transactionSlice, { setStage } from "../transactionSlice";

type CosmosDonateArgs = {
  chain: VerifiedChain;
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
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const contract = new Contract(args.chain);
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
            chainId: args.chain.chain_id,
            amount: +amount,
            denomination: token.symbol,
            splitLiq: split_liq,
            walletAddress: args.chain.wallet.address,
          });
        }

        updateStage({
          step: "success",
          message: "Thank you for your donation",
          txHash: response.transactionHash,
          rawLog: response.rawLog,
          chain: args.chain,
          //share is enabled for both individual and tca donations
          isShareEnabled: true,
        });

        //invalidate user balance and endowment balance
        dispatch(
          invalidateJunoTags([
            /** invalidate future balance queriers */
          ])
        );
      } else {
        updateStage({
          step: "error",
          message: "Transaction failed",
          txHash: response.transactionHash,
          chainId: args.chain.chain_id,
        });
      }
    } catch (err) {
      handleTxError(err, updateStage);
    }
  }
);
