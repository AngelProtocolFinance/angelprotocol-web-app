import { DeliverTxResponse } from "@cosmjs/stargate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SuccessLink } from "slices/transaction/types";
import { ChainWallet } from "contexts/ChainGuard";
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

export const logStatusUpdateProposal = createAsyncThunk(
  `${transactionSlice.name}/logStatusUpdateProposal`,
  async (
    args: {
      res: DeliverTxResponse;
      proposalLink: SuccessLink;
      wallet: ChainWallet;
      PK: string;
    },
    { dispatch }
  ) => {
    try {
      dispatch(
        setStage({
          step: "submit",
          message: "Saving proposal information",
        })
      );
      //set to helper
      const parsedId = getWasmAttribute("proposal_id", args.res.rawLog);
      const numId = idParamToNum(parsedId);

      if (numId === 0) throw new Error("Failed to get proposal id");
      const generatedToken = createAuthToken("charity-owner");
      const response = await fetch(`${APIs.aws}/registration?uuid=${args.PK}`, {
        method: "PUT",
        headers: { authorization: generatedToken },
        body: JSON.stringify({
          chain_id: args.wallet.chain_id,
          poll_id: numId,
        }),
      });

      dispatch(
        setStage({
          step: "success",
          message: "Status change proposal submitted",
          txHash: args.res.transactionHash,
          chain: args.wallet,
          successLink: args.proposalLink,
        })
      );
      //success = 2xx
      if (response.status < 200 || response.status > 299) {
        throw new Error(`Non-success response status: ${response.status}`);
      }
    } catch (err) {
      logger.error(err);
      dispatch(
        setStage({
          step: "error",
          message: `Failed to log status change proposal. Contact support@angelprotocol.io`,
          txHash: args.res.transactionHash,
        })
      );
    }
  }
);
