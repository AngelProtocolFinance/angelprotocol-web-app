import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendCosmosTxArgs, StageUpdater, TxOptions } from "../types";
import Contract from "contracts/Contract";
import handleTxError from "../handleTxError";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendCosmosTx = createAsyncThunk(
  `${transactionSlice.name}/sendCosmosTx`,
  async (args: SendCosmosTxArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };

    try {
      updateStage({ step: "submit", message: "Submitting transaction..." });
      const contract = new Contract(args.chain);
      let tx: TxOptions;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        const fee = await contract.estimateFee(args.msgs);
        //let wallet handle fee balance checks
        tx = { msgs: args.msgs, fee };
      }

      const response = await contract.signAndBroadcast(tx);

      if (!response.code) {
        if (args.onSuccess) {
          //success thunk should show user final success msg
          dispatch(args.onSuccess(response, args.chain));
        } else {
          updateStage({
            step: "success",
            message: args.successMessage || "Transaction succesful!",
            txHash: response.transactionHash,
            rawLog: response.rawLog,
            chain: args.chain,
            successLink: args.successLink,
          });
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
          chainId: args.chain.chain_id,
        });
      }
    } catch (err) {
      handleTxError(err, updateStage);
    }
  }
);
