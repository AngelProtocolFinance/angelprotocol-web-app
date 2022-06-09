import transactionSlice, { setStage } from "../transactionSlice";
import { StageUpdator, Step } from "../types";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { chainIDs } from "constants/chainIDs";
import { CURRENCIES, denoms } from "constants/currency";
import Contract from "contracts/Contract";
import extractFeeData from "helpers/extractFeeData";
import handleTerraError from "helpers/handleTerraError";
import { WalletProxy } from "providers/WalletProvider";
import { tags as awsTags } from "services/aws/tags";
import { tags as terraTags } from "services/terra/tags";
import { RootState } from "store/store";

type WithMsg = { msgs: Msg[]; tx?: never }; //tx created onflight
type WithTx = { msgs?: never; tx: CreateTxOptions }; //pre-estimated tx

type SenderArgs = {
  wallet: WalletProxy | undefined;
  tagPayloads?: PayloadAction<TagDescription<terraTags | awsTags>[], string>[];
  feedDenom?: denoms;
};

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
        const denom = args.feedDenom || denoms.uusd;
        const fee = await contract.estimateFee(args.msgs, denom);
        const feeData = extractFeeData(fee, denom);

        const state = getState() as RootState;
        const walletBalanceForFee =
          state.wallet.coins.find((coin) => coin.denom === feeData.denom)
            ?.amount || 0;

        if (feeData.amount > walletBalanceForFee) {
          updateTx({
            step: Step.error,
            message: `Not enough ${
              CURRENCIES[feeData.denom].ticker
            } to pay for fees`,
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
            message: "Transaction successful!",
            txHash: txInfo.txhash,
            chainId,
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
      console.error(err);
      handleTerraError(err, updateTx);
    }
  }
);
