import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions } from "@terra-money/terra.js";
import { StageUpdator, TerraSendArgs } from "slices/transaction/types";
import Contract from "contracts/Contract";
import extractFeeNum from "helpers/extractFeeNum";
import handleTerraError from "helpers/handleTerraError";
import { pollTerraTxInfo } from "helpers/pollTerraTxInfo";
import { postTerraTx } from "helpers/postTerraTx";
import { WalletDisconnectError } from "errors/errors";
import { terraChainId } from "constants/env";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendTerraTx = createAsyncThunk(
  `${transactionSlice.name}/sendTerraTx`,
  async (args: TerraSendArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }

      updateTx({ step: "submit", message: "Submitting transaction..." });

      let tx: CreateTxOptions;
      const contract = new Contract(args.wallet.address);
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
        const fee = await contract.estimateFee(args.msgs);
        const feeNum = extractFeeNum(fee);

        if (feeNum > args.wallet.displayCoin.balance) {
          updateTx({
            step: "error",
            message: `Not enough balance to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await postTerraTx(tx);

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
