import { createAsyncThunk } from "@reduxjs/toolkit";
import logDonation from "components/Transactors/Donater/logDonation";
import { chainIDs } from "constants/chainIDs";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import transactionSlice, { setStage } from "./transactionSlice";
import { StageUpdator, Step, TerraDonateArgs } from "./types";
export const sendTerraDonation = createAsyncThunk(
  `${transactionSlice.name}/terraDonate`,
  async (args: TerraDonateArgs, { dispatch }) => {
    const updateStage: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) {
        updateStage({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      updateStage({ step: Step.submit, message: "Submitting transaction.." });

      const response = await args.wallet.post(args.tx!);
      const chainId = args.wallet.network.chainID as chainIDs;

      if (response.success) {
        updateStage({ step: Step.submit, message: "Saving donation details" });

        const walletAddress = args.wallet.walletAddress;
        const { receiver, currency, amount, split_liq } = args.donateValues;

        if (typeof receiver !== "undefined") {
          await logDonation(
            response.result.txhash,
            chainId,
            amount,
            currency,
            split_liq,
            walletAddress,
            receiver
          );
        }

        updateStage({
          step: Step.broadcast,
          message: "Waiting for transaction details",
          txHash: response.result.txhash,
          chainId,
        });

        const contract = new Contract(args.wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateStage({
            step: Step.success,
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chainId,
            isReceiptEnabled: typeof receiver !== "undefined",
          });
        } else {
          updateStage({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId,
          });
        }
      }
    } catch (err) {
      handleTerraError(err, updateStage);
    }
  }
);
