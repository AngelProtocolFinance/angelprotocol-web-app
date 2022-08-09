import { createAsyncThunk } from "@reduxjs/toolkit";
import { StageUpdater, TxOptions } from "slices/transaction/types";
import { KYCData, Receiver } from "types/server/aws";
import { invalidateJunoTags } from "services/juno";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { DonateValues } from "components/Transactors/Donater";
import Contract from "contracts/Contract";
import handleWalletError from "helpers/handleWalletError";
import logDonation from "helpers/logDonation";
import { WalletDisconnectError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import transactionSlice, { setStage } from "../transactionSlice";

type JunoDonateArgs = {
  wallet?: WalletState;
  donateValues: DonateValues;
  tx: TxOptions;
  kycData?: KYCData;
};

export const sendCosmosDonation = createAsyncThunk(
  `${transactionSlice.name}/junoDonate`,
  async (args: JunoDonateArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) throw new WalletDisconnectError();
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
            chainId: chainIds.juno,
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
          chainId: chainIds.juno,
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
          chainId: chainIds.juno,
        });
      }
    } catch (err) {
      console.error(err);
      handleWalletError(err, updateStage);
    }
  }
);
