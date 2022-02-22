import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIDs } from "constants/chainIDs";
import Contract from "contracts/Contract";
import { terra } from "services/terra/terra";
import handleTerraError from "helpers/handleTerraError";
import { gov, tags, user } from "services/terra/tags";
import transactionSlice, { setStage } from "./transactionSlice";
import { HaloStakingArgs, StageUpdator, Step } from "./types";

export const haloStakeUnstake = createAsyncThunk(
  `${transactionSlice.name}/haloStakeUnstake`,
  async (args: HaloStakingArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };

    if (!args.wallet) {
      updateTx({ step: Step.error, message: "Wallet is not connected" });
      return;
    }
    try {
      updateTx({ step: Step.submit, message: "Submitting transaction..." });
      const response = await args.wallet.post(args.tx);
      const chainId = args.wallet.network.chainID as chainIDs;
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
            message: args.stakingValues.is_stake
              ? "Staking successfull!"
              : "HALO successfully withdrawn",
            txHash: txInfo.txhash,
            chainId,
          });

          //invalidate cache to fetch new data
          dispatch(
            terra.util.invalidateTags([
              { type: tags.gov, id: gov.staker },
              { type: tags.gov, id: gov.halo_balance },
              { type: tags.user, id: user.halo_balance },
            ])
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
