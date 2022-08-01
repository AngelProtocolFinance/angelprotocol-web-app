import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { parseRawLog } from "@cosmjs/stargate/build/logs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SendCosmosTxArgs,
  StageUpdater,
  TxOptions,
} from "slices/transaction/types";
import logApplicationReview from "pages/Admin/Applications/logApplicationReview";
import Contract from "contracts/Contract";
import extractFeeData from "helpers/extractFeeData";
import handleTxError from "helpers/handleTxError";
import { WalletDisconnectError } from "errors/errors";
import transactionSlice, { setStage } from "../transactionSlice";

type _SenderArgs = SendCosmosTxArgs & {
  applicationId: string;
};

export const sendEndowmentReviewTx = createAsyncThunk(
  `${transactionSlice.name}/sendEndowmentReviewCosmosTx`,
  async (args: _SenderArgs, { dispatch }) => {
    const updateState: StageUpdater = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        throw new WalletDisconnectError();
      }

      updateState({ step: "submit", message: "Submitting transaction..." });

      const contract = new Contract(args.wallet);
      let tx: TxOptions;
      if (args.tx) {
        //pre-estimated tx doesn't need additional checks
        tx = args.tx;
      } else {
        //run fee estimation for on-demand created tx
        const fee = await contract.estimateFee(args.msgs);

        const feeData = extractFeeData(
          fee,
          args.wallet.chain.native_currency.token_id
        );
        if (feeData.amount > args.wallet.displayCoin.balance) {
          updateState({
            step: "error",
            message: `Not enough balance to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await contract.signAndBroadcast(tx);

      updateState({
        step: "broadcast",
        message: "Waiting for transaction result",
        txHash: response.transactionHash,
        chain: args.wallet.chain,
      });

      if (isDeliverTxSuccess(response)) {
        if (!response.code) {
          updateState({
            step: "success",
            message: args.successMessage || "Transaction successful!",
            txHash: response.transactionHash,
            chain: args.wallet.chain,
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
            chain_id: args.wallet.chain.chain_id,
            PK: args.applicationId,
          });

          //invalidate cache entries
          for (const tagPayload of args.tagPayloads || []) {
            dispatch(tagPayload);
          }
        } else {
          updateState({
            step: "error",
            message: "Transaction failed",
            txHash: response.transactionHash,
            chainId: args.wallet.chain.chain_id,
          });
        }
      } else {
        updateState({
          step: "error",
          message: "Transaction failed",
          txHash: response.transactionHash,
          chainId: args.wallet.chain.chain_id,
        });
      }
    } catch (err) {
      handleTxError(err, updateState);
    }
  }
);
