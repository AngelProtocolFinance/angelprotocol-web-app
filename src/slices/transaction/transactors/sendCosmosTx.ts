import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SendCosmosTxArgs,
  StageUpdater,
  TxOptions,
} from "slices/transaction/types";
import Contract from "contracts/Contract";
import handleWalletError from "helpers/handleWalletError";
import { WalletDisconnectError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendCosmosTx = createAsyncThunk(
  `${transactionSlice.name}/sendCosmosTx`,
  async (args: SendCosmosTxArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }
      updateStage({ step: "submit", message: "Submitting transaction..." });
      const contract = new Contract(args.wallet);
      let tx: TxOptions;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        const { fee, feeNum } = await contract.estimateFee(args.msgs);

        if (feeNum > args.wallet.displayCoin.balance) {
          updateStage({
            step: "error",
            message: `Not enough balance to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await contract.signAndBroadcast(tx);

      if (!response.code) {
        updateStage({
          step: "success",
          message: args.successMessage || "Transaction succesful!",
          txHash: response.transactionHash,
          rawLog: response.rawLog,
          chainId: chainIds.juno,
          successLink: args.successLink,
        });

        if (args.setLogProcessor) {
          dispatch(args.setLogProcessor(response.rawLog));
        }

        //invalidate cache entries
        for (const tagPayload of args.tagPayloads || []) {
          dispatch(tagPayload);
        }
      } else {
        updateStage({
          step: "error",
          message: "Transaction failed",
          txHash: response.transactionHash,
          chainId: chainIds.juno,
        });
      }
    } catch (err) {
      console.log(err);
      handleWalletError(err, updateStage);
    }
  }
);
