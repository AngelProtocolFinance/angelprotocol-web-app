import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { WalletController } from "@terra-money/wallet-provider";
import {
  SenderArgs,
  StageUpdator,
  WithMsg,
  WithTx,
} from "slices/transaction/types";
import Contract from "contracts/Contract";
import extractFeeNum from "helpers/extractFeeNum";
import handleTerraError from "helpers/handleTerraError";
import { pollTerraTxInfo } from "helpers/pollTerraTxInfo";
import { chainOptions } from "constants/chainOptions";
import { terraChainId } from "constants/env";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendTerraTx = createAsyncThunk(
  `${transactionSlice.name}/sendTerraTx`,
  async (
    args: (SenderArgs & WithMsg) | (SenderArgs & WithTx),
    { dispatch }
  ) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      updateTx({ step: "submit", message: "Submitting transaction..." });
      const { post } = new WalletController({
        ...chainOptions,
      });

      let tx: CreateTxOptions;
      const contract = new Contract();
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
        const fee = await contract.estimateFee(args.msgs);
        const feeNum = extractFeeNum(fee);

        if (feeNum > args.feeBalance) {
          updateTx({
            step: "error",
            message: `Not enough balance to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await post(tx);

      updateTx({
        step: "broadcast",
        message: "Waiting for transaction result",
        txHash: response.result.txhash,
        chainId: terraChainId,
      });

      if (response.success) {
        const txInfo = await pollTerraTxInfo(response.result.txhash, 7, 1000);
        if (!txInfo.code) {
          updateTx({
            step: "success",
            message: args.successMessage || "Transaction successful!",
            txHash: txInfo.txhash,
            txInfo: txInfo,
            chainId: terraChainId,
            successLink: args.successLink,
          });

          //invalidate cache entries
          for (const tagPayload of args.tagPayloads || []) {
            dispatch(tagPayload);
          }
        } else {
          updateTx({
            step: "error",
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId: terraChainId,
          });
        }
      } else {
        updateTx({
          step: "error",
          message: "Transaction failed",
          txHash: response.result.txhash,
          chainId: terraChainId,
        });
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }
);
