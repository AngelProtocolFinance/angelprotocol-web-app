import { createAsyncThunk } from "@reduxjs/toolkit";
import { StageUpdater, TxOptions } from "../types";
import { apesTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { accountTags, junoTags } from "services/juno/tags";
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
        const { charityId, token, amount, split_liq, kycData } =
          args.donateValues;

        updateStage({
          step: "submit",
          message: kycData ? "Requesting receipt.." : "Saving donation details",
        });

        await logDonation({
          ...kycData,
          transactionId: response.transactionHash,
          transactionDate: new Date().toISOString(),
          chainId: args.wallet.chain.chain_id,
          amount: +amount,
          denomination: token.symbol,
          splitLiq: split_liq,
          walletAddress: args.wallet.address,
          charityId,
          chainName: args.wallet.chain.chain_name,
          charityName: args.donateValues.charityName,
          profileUrl: args.donateValues.profileUrl,
        });

        updateStage({
          step: "success",
          message: "Thank you for your donation",
          txHash: response.transactionHash,
          rawLog: response.rawLog,
          chainId: args.wallet.chain.chain_id,
          //share is enabled for both individual and tca donations
          isShareEnabled: true,
        });

        dispatch(
          invalidateApesTags([
            { type: apesTags.chain }, //invalidate user balance
            { type: apesTags.donations }, //invalidate donation logs
          ])
        );

        //invalidate endowment balance
        dispatch(
          invalidateJunoTags([
            { type: junoTags.account, id: accountTags.balance },
          ])
        );
      } else {
        updateStage({
          step: "error",
          message: "Transaction failed",
          txHash: response.transactionHash,
          chainId: args.wallet.chain.chain_id,
        });
      }
    } catch (err) {
      handleTxError(err, updateStage);
    }
  }
);
