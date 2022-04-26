import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTxOptions, TxLog } from "@terra-money/terra.js";
import { ChainIDs } from "@types-lists";
import {
  SenderArgs,
  StageUpdator,
  WithMsg,
  WithTx,
} from "@types-slice/transaction";
import logApplicationReview from "pages/Admin/Applications/logApplicationReview";
import { RootState } from "store/store";
import Contract from "contracts/Contract";
import extractFeeNum from "helpers/extractFeeNum";
import handleTerraError from "helpers/handleTerraError";
import { currency_text } from "constants/currency";
import transactionSlice, { setStage } from "../transactionSlice";

type _SenderArgs = SenderArgs & {
  applicationId: string;
};

export const sendEndowmentReviewTx = createAsyncThunk(
  `${transactionSlice.name}/sendEndowmentReviewTerraTx`,
  async (
    args: (_SenderArgs & WithMsg) | (_SenderArgs & WithTx),
    { dispatch, getState }
  ) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    try {
      if (!args.wallet) {
        updateTx({ step: "error", message: "Wallet is not connected" });
        return;
      }

      updateTx({ step: "submit", message: "Submitting transaction..." });

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
        const feeDenom = args.feedDenom || "uusd";
        const walletBalanceForFee =
          state.wallet.coins.find((coin) => coin.denom === feeDenom)?.amount ||
          0;

        if (feeNum > walletBalanceForFee) {
          updateTx({
            step: "error",
            message: `Not enough ${currency_text[feeDenom]} to pay for fees`,
          });
          return;
        }
        tx = { msgs: args.msgs, fee };
      }

      const response = await args.wallet.post(tx);
      const chainId = contract.chainID;

      updateTx({
        step: "broadcast",
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
            step: "success",
            message: args.successMessage || "Transaction successful!",
            txHash: txInfo.txhash,
            chainId,
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
            chain_id: args.wallet.network.chainID as ChainIDs,
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
            chainId,
          });
        }
      } else {
        updateTx({
          step: "error",
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
