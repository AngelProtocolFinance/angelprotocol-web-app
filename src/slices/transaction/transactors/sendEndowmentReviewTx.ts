import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions, TxLog } from "@terra-money/terra.js";
import { StageUpdator, TerraSendArgs } from "slices/transaction/types";
import logApplicationReview from "pages/Admin/Applications/logApplicationReview";
import { createBaseContract } from "contracts";
import convertFromMicro from "helpers/convertFromMicro";
import handleTerraError from "helpers/handleTerraError";
import { pollTerraTxInfo } from "helpers/pollTerraTxInfo";
import { postTerraTx } from "helpers/postTerraTx";
import { WalletDisconnectError } from "errors/errors";
import { terraChainId } from "constants/env";
import transactionSlice, { setStage } from "../transactionSlice";

type _SenderArgs = TerraSendArgs & {
  applicationId: string;
};

export const sendEndowmentReviewTx = createAsyncThunk(
  `${transactionSlice.name}/sendEndowmentReviewTerraTx`,
  async (args: _SenderArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }

      updateTx({ step: "submit", message: "Submitting transaction..." });

      let tx: CreateTxOptions;
      const contract = createBaseContract(args.wallet);
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
        const fee = await contract.estimateFee(args.msgs);
        const feeNum = convertFromMicro(fee);

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
        const getTxInfo = pollTerraTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: "success",
            message: args.successMessage || "Transaction successful!",
            txHash: txInfo.txhash,
            txInfo,
            chainId: terraChainId,
            successLink: args.successLink,
          });

          const logs = txInfo.logs as unknown as TxLog[];

          const proposal_id = logs[0]?.events
            .find((event) => {
              return event.type === "wasm";
            })
            ?.attributes.find((attribute) => {
              return attribute.key === "proposal_id";
            })?.value as string;

          await logApplicationReview({
            poll_id: proposal_id,
            chain_id: args.wallet.chainId,
            PK: args.applicationId,
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
