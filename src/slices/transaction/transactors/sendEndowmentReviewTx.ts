import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { parseRawLog } from "@cosmjs/stargate/build/logs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendCosmosTxArgs, StageUpdator } from "slices/transaction/types";
import { TxOptions } from "types/third-party/cosmjs";
import logApplicationReview from "pages/Admin/Applications/logApplicationReview";
import Contract from "contracts/Contract";
import handleTerraError from "helpers/handleTerraError";
import { WalletDisconnectError } from "errors/errors";
import { terraChainId } from "constants/chainIDs";
import transactionSlice, { setStage } from "../transactionSlice";

type _SenderArgs = SendCosmosTxArgs & {
  applicationId: string;
};

export const sendEndowmentReviewTx = createAsyncThunk(
  `${transactionSlice.name}/sendEndowmentReviewCosmosTx`,
  async (args: _SenderArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }

      updateTx({ step: "submit", message: "Submitting transaction..." });

      const contract = new Contract(args.wallet);
      let tx: TxOptions;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
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

      const response = await contract.signAndBroadcast(tx);

      updateTx({
        step: "broadcast",
        message: "Waiting for transaction result",
        txHash: response.transactionHash,
        chainId: terraChainId,
      });

      if (isDeliverTxSuccess(response)) {
        if (!response.code) {
          updateTx({
            step: "success",
            message: args.successMessage || "Transaction successful!",
            txHash: response.transactionHash,
            chainId: terraChainId,
            successLink: args.successLink,
          });

          const logs = parseRawLog(response.rawLog);

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
            txHash: response.transactionHash,
            chainId: terraChainId,
          });
        }
      } else {
        updateTx({
          step: "error",
          message: "Transaction failed",
          txHash: response.transactionHash,
          chainId: terraChainId,
        });
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }
);
