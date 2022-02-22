import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIDs } from "constants/chainIDs";
import Halo from "contracts/Halo";
import handleTerraError from "helpers/handleTerraError";
import { gov, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import transactionSlice, { setStage } from "../transactionSlice";
import { StageUpdator, Step } from "../types";
import { CreatePollArgs } from "./transactorTypes";

export const createPoll = createAsyncThunk(
  `${transactionSlice.name}/createPoll`,
  async (args: CreatePollArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }

      updateTx({ step: Step.submit, message: "Submitting transaction.." });

      //recreate tx here with actual form contents
      const contract = new Halo(args.wallet);
      const { amount, title, description, link } = args.createPollValues;
      const tx = await contract.createPoll(
        +amount,
        title,
        description,
        link,
        undefined,
        true //on submission, snapshot the poll
      );
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
            message: "Poll successfully created!",
            txHash: txInfo.txhash,
            chainId,
          });

          dispatch(
            terra.util.invalidateTags([{ type: tags.gov, id: gov.polls }])
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
