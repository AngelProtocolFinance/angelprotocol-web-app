import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendCosmosTxArgs, StageUpdater, TxOptions } from "../types";
import Contract from "contracts/Contract";
import { extractFeeAmount } from "helpers";
import { WalletDisconnectedError } from "errors/errors";
import handleTxError from "../handleTxError";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendCosmosTx = createAsyncThunk(
  `${transactionSlice.name}/sendCosmosTx`,
  async (args: SendCosmosTxArgs, { dispatch }) => {
    const updateStage: StageUpdater = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectedError();
      }
      updateStage({ step: "submit", message: "Submitting transaction..." });
      const contract = new Contract(args.wallet);
      let tx: TxOptions;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        const fee = await contract.estimateFee(args.msgs);

        const feeAmount = extractFeeAmount(
          fee,
          args.wallet.chain.native_currency.token_id
        );
        if (feeAmount > args.wallet.displayCoin.balance) {
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
          chain: args.wallet.chain,
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
          chainId: args.wallet.chain.chain_id,
        });
      }
    } catch (err) {
      handleTxError(err, updateStage);
    }
  }
);
