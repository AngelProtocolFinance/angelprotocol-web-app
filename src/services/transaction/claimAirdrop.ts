import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import Halo from "contracts/Halo";
import handleTerraError from "helpers/handleTerraError";
import { aws } from "services/aws/aws";
import { tags as aws_tags } from "services/aws/tags";
import { gov, tags, user } from "services/terra/tags";
import { terra } from "services/terra/terra";
import transactionSlice, { setStage } from "./transactionSlice";
import { ClaimAirdropArgs, StageUpdator, Step } from "./types";

export const claimAirdrop = createAsyncThunk(
  `${transactionSlice.name}/claimAirdrop`,
  async (args: ClaimAirdropArgs, { dispatch }) => {
    const updateTx: StageUpdator = (update) => {
      dispatch(setStage(update));
    };
    try {
      if (!args.wallet) {
        updateTx({ step: Step.error, message: "Wallet is disconnected" });
        return;
      }
      const chainId = args.wallet.network.chainID as chainIDs;
      //create tx and estimate fee
      const contract = new Halo(args.wallet);
      const tx = await contract.createAirdropClaimTx(
        args.airdrops,
        args.isStake
      );

      const estimatedFee = tx
        .fee!.amount.get(denoms.uusd)!
        .mul(1e-6)
        .amount.toNumber();

      //check if user has enough balance to pay for fees
      if (estimatedFee > args.ustBalance) {
        updateTx({
          step: Step.error,
          message: "Not enough UST to pay for fees",
        });

        return;
      }

      const response = await args.wallet.post(tx!);

      updateTx({
        step: Step.broadcast,
        message: "Waiting for transaction result",
        txHash: response.result.txhash,
        chainId,
      });

      if (response.success) {
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: `HALO successfully claimed${
              args.isStake ? " and staked" : ""
            }`,
            txHash: txInfo.txhash,
            chainId,
          });

          //refetch new data
          dispatch(
            terra.util.invalidateTags([
              { type: tags.gov, id: gov.staker },
              { type: tags.gov, id: gov.halo_balance },
              { type: tags.user, id: user.halo_balance },
            ])
          );
          dispatch(aws.util.invalidateTags([{ type: aws_tags.airdrop }]));
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
