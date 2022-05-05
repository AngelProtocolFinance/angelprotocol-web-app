import { createAsyncThunk } from "@reduxjs/toolkit";
import { multicall, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import logDonation from "components/Transactors/Donater/logDonation";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import { chainIDs } from "constants/chainIDs";
import transactionSlice, { setStage } from "../transactionSlice";
import { StageUpdator, Step } from "../types";
import { TerraDonateArgs } from "./transactorTypes";

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
      const chainId = args.wallet.network.chainID;

      if (response.success) {
        updateStage({ step: Step.submit, message: "Saving donation details" });

        const walletAddress = args.wallet.address;
        const { receiver, token, amount, split_liq } = args.donateValues;

        if (typeof receiver !== "undefined") {
          await logDonation(
            response.result.txhash,
            chainId,
            amount,
            token.symbol,
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
            //share is enabled for both individual and tca donations
            isShareEnabled: true,
          });

          //invalidate user balance and endowment balance
          dispatch(
            terra.util.invalidateTags([
              { type: tags.multicall, id: multicall.endowmentBalance },
              { type: tags.multicall, id: multicall.terraBalances },
            ])
          );
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
