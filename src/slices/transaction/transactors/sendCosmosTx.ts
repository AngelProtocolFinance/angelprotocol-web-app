import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendCosmosTxArgs, StageUpdator } from "slices/transaction/types";
import { Tx } from "types/third-party/cosmjs";
import handleTerraError from "helpers/handleTerraError";
import { getCosmosClient, getFee, getFeeNum } from "helpers/third-party/cosmjs";
import { WalletDisconnectError } from "errors/errors";
import { junoChainId } from "constants/chainIDs";
import transactionSlice, { setStage } from "../transactionSlice";

export const sendCosmosTx = createAsyncThunk(
  `${transactionSlice.name}/sendCosmosTx`,
  async (args: SendCosmosTxArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }
      updateTx({ step: "submit", message: "Submitting transaction..." });
      const client = await getCosmosClient();
      let tx: Tx;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
        const gas = await client.simulate(
          args.wallet.address,
          args.msgs,
          undefined
        );
        const fee = getFee(gas);
        const feeNum = getFeeNum(fee);

        if (feeNum > args.wallet.displayCoin.balance) {
          updateTx({
            step: "error",
            message: `Not enough balance to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await client.signAndBroadcast(
        args.wallet.address,
        tx.msgs,
        tx.fee
      );

      if (!response.code) {
        updateTx({
          step: "success",
          message: args.successMessage || "Transaction succesful!",
          txHash: response.transactionHash,
          rawLogs: response.rawLog,
          chainId: junoChainId,
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
          txHash: response.transactionHash,
          chainId: junoChainId,
        });
      }
    } catch (err) {
      console.log(err);
      handleTerraError(err, updateTx);
    }
  }
);
