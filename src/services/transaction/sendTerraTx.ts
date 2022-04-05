import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import handleTerraError from "helpers/handleTerraError";
import Contract from "contracts/Contract";
import { chainIDs } from "constants/chainIDs";
import { currency_text, denoms } from "constants/currency";
import { RootState } from "store/store";
import transactionSlice, { setStage } from "./transactionSlice";
import { SenderArgs, StageUpdator, Step, WithMsg, WithTx } from "./types";
import extractFeeNum from "helpers/extractFeeNum";

export const sendTerraTx = createAsyncThunk(
  `${transactionSlice.name}/sendTerraTx`,
  async (
    args: (SenderArgs & WithMsg) | (SenderArgs & WithTx),
    { dispatch, getState }
  ) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }

      updateTx({ step: Step.submit, message: "Submitting transaction..." });

      let tx: CreateTxOptions;
      const contract = new Contract(args.wallet);
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
        const fee = await contract.estimateFee(args.msgs);
        const feeNum = extractFeeNum(fee);

        const state = getState() as RootState;
        const feeDenom = args.feedDenom || denoms.uusd;
        const walletBalanceForFee =
          state.wallet.coins.find((coin) => coin.denom === feeDenom)?.amount ||
          0;

        if (feeNum > walletBalanceForFee) {
          updateTx({
            step: Step.error,
            message: `Not enough ${currency_text[feeDenom]} to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await args.wallet.post(tx);
      const chainId = contract.chainID as chainIDs;

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
            message: args.successMessage || "Transaction successful!",
            txHash: txInfo.txhash,
            chainId,
            successLink: args.successLink,
          });

          //invalidate cache entries
          for (const tagPayload of args.tagPayloads || []) {
            dispatch(tagPayload);
          }
        } else {
          updateTx({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId,
          });
        }
      } else {
        updateTx({
          step: Step.error,
          message: "Transaction failed",
          txHash: response.result.txhash,
          chainId,
        });
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }
);
