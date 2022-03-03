import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { chainIDs } from "constants/chainIDs";
import Contract from "contracts/Contract";
import { tags as terraTags } from "services/terra/tags";
import { tags as awsTags } from "services/aws/tags";
import handleTerraError from "helpers/handleTerraError";
import transactionSlice, { setStage } from "./transactionSlice";
import { StageUpdator, Step } from "./types";
import { currency_text, denoms } from "constants/currency";
import { RootState } from "store/store";

type WithMsg = { msgs: Msg[]; tx?: never };
type WithTx = { msgs?: never; tx: CreateTxOptions };
type SenderArgs = {
  wallet: ConnectedWallet | undefined;
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
        tx = await contract.createTx(args.msgs);
        const state = getState() as RootState;

        const feeDenom = args.feedDenom || denoms.uusd;
        const walletBalanceForFee =
          state.wallet.coins.find((coin) => coin.denom === feeDenom)?.amount ||
          0;

        const estimatedFee = tx
          //for terra tx, pay fees with UST otherwise specified
          .fee!.amount.get(args.feedDenom || denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        if (estimatedFee > walletBalanceForFee) {
          updateTx({
            step: Step.error,
            message: `Not enough ${currency_text[feeDenom]} to pay for fees`,
          });
          return;
        }
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
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }
);
