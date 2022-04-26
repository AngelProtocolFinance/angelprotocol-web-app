import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChainIDs } from "@types-lists";
import { StageUpdator } from "@types-slice/transaction";
import logDonation from "components/Transactors/Donater/logDonation";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import transactionSlice, { setStage } from "../transactionSlice";
import { TerraDonateArgs } from "./transactorTypes";

export const sendTerraDonation = createAsyncThunk(
  `${transactionSlice.name}/terraDonate`,
  async (args: TerraDonateArgs, { dispatch }) => {
    const updateStage: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) {
        updateStage({ step: "error", message: "Wallet is not connected" });
        return;
      }
      updateStage({ step: "submit", message: "Submitting transaction.." });

      const response = await args.wallet.post(args.tx!);
      const chainId = args.wallet.network.chainID as ChainIDs;

      if (response.success) {
        updateStage({ step: "submit", message: "Saving donation details" });

        const walletAddress = args.wallet.address;
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
          step: "broadcast",
          message: "Waiting for transaction details",
          txHash: response.result.txhash,
          chainId,
        });

        const contract = new Contract(args.wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateStage({
            step: "success",
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chainId,
            isReceiptEnabled: typeof receiver !== "undefined",
            //share is enabled for both individual and tca donations
            isShareEnabled: true,
          });
        } else {
          updateStage({
            step: "error",
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
