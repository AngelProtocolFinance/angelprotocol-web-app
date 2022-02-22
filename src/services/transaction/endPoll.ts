import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIDs } from "constants/chainIDs";
import Halo from "contracts/Halo";
import handleTerraError from "helpers/handleTerraError";
import { tags, user } from "services/terra/tags";
import { terra } from "services/terra/terra";
import transactionSlice, { setStage } from "./transactionSlice";
import { EndPollArgs, StageUpdator, Step } from "./types";

export const endPoll = createAsyncThunk(
  `${transactionSlice.name}/endPoll`,
  async (args: EndPollArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      if (!args.pollId) {
        updateTx({ step: Step.error, message: "Poll has invalid id" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction..." });

      const contract = new Halo(args.wallet);
      const tx = await contract.createEndPollTx(args.pollId);
      const response = await args.wallet.post(tx);
      const chainId = args.wallet.network.chainID as chainIDs;

      if (response.success) {
        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction result",
          txHash: response.result.txhash,
          chainId,
        });

        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Poll successfully ended",
            txHash: response.result.txhash,
            chainId,
          });

          dispatch(
            terra.util.invalidateTags([
              //invalidate whole gov cache
              { type: tags.gov },
              { type: tags.user, id: user.halo_balance },
            ])
          );
        } else {
          updateTx({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId,
          });
        }
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }
);
