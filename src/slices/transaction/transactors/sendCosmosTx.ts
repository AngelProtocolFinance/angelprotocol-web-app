import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendCosmosTxArgs, StageUpdator } from "slices/transaction/types";
import { Tx } from "types/third-party/cosmjs";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
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
      const contract = new Contract(args.wallet);
      let tx: Tx;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        const { fee, feeNum } = await contract.estimateFee(args.msgs);

        if (feeNum > args.wallet.displayCoin.balance) {
          updateTx({
            step: "error",
            message: `Not enough balance to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await contract.signAndBroadcast(tx.msgs, tx.fee);

      if (!response.code) {
        updateTx({
          step: "success",
          message: args.successMessage || "Transaction succesful!",
          txHash: response.transactionHash,
          rawLog: response.rawLog,
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
