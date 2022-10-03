import { DeliverTxResponse } from "@cosmjs/stargate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { invalidateAwsTags } from "services/aws/aws";
import { adminTags, awsTags } from "services/aws/tags";
import { WalletState } from "contexts/WalletContext/WalletContext";
import transactionSlice, {
  setStage,
} from "slices/transaction/transactionSlice";
import {
  createAuthToken,
  getWasmAttribute,
  idParamToNum,
  logger,
} from "helpers";
import { APIs } from "constants/urls";

export const logProposalId = createAsyncThunk(
  `${transactionSlice.name}/logProposalId`,
  async (
    args: { res: DeliverTxResponse; wallet: WalletState; PK: string },
    { dispatch }
  ) => {
    try {
      dispatch(
        setStage({ step: "submit", message: "Saving endowment proposal" })
      );

      const parsedId = getWasmAttribute("proposal_id", args.res.rawLog);
      const numId = idParamToNum(parsedId);
      if (numId === 0) throw new Error("Failed to get proposal id");

      const generatedToken = createAuthToken("charity-owner");
      const response = await fetch(
        `${APIs.aws}/v1/registration/${args.PK}/submit`,
        {
          method: "POST",
          body: JSON.stringify({
            poll_id: numId,
            chain_id: args.wallet.chain.chain_id,
          }),
          headers: { authorization: generatedToken },
        }
      );

      dispatch(
        setStage({
          step: "success",
          message: "Endowment submitted for review",
          txHash: args.res.transactionHash,
          chainId: args.wallet.chain.chain_id,
        })
      );

      dispatch(
        invalidateAwsTags([{ type: awsTags.admin, id: adminTags.registration }])
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
    } catch (err) {
      logger.error(err);
      dispatch(
        setStage({
          step: "error",
          message:
            "Failed to create endowment. Contact support@angelprotocol.io",
        })
      );
    }
    //parse endowment id
  }
);
