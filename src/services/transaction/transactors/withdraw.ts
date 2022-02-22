import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIDs } from "constants/chainIDs";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import { tags, user } from "services/terra/tags";
import { terra } from "services/terra/terra";
import transactionSlice, { setStage } from "../transactionSlice";
import { StageUpdator, Step } from "../types";
import { TerraArgs } from "./transactorTypes";

export const withdraw = createAsyncThunk(
  `${transactionSlice.name}/withdraw`,
  async (args: TerraArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }

      updateTx({ step: Step.submit, message: "Submitting transaction..." });
      const response = await args.wallet.post(args.tx);
      const chainId = args.wallet.network.chainID as chainIDs;

      updateTx({
        step: Step.broadcast,
        message: "Waiting for transaction result",
        txHash: response.result.txhash,
        chainId,
      });

      if (response.success) {
        const contract = new Contract(args.wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Withdraw successful",
            txHash: response.result.txhash,
            chainId,
          });

          dispatch(
            terra.util.invalidateTags([
              { type: tags.endowment },
              { type: tags.user, id: user.terra_balance },
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
