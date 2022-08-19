import { DeliverTxResponse } from "@cosmjs/stargate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SuccessLink } from "slices/transaction/types";
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

export const logWithdrawProposal = createAsyncThunk(
  `${transactionSlice.name}/logWithdrawProposal`,
  async (
    {
      res,
      proposalLink,
      wallet,
      ...payload
    }: {
      res: DeliverTxResponse;
      proposalLink: SuccessLink;
      wallet: WalletState;

      endowment_multisig: string;
      proposal_chain_id: string;
      target_chain: string;
      target_wallet: string;
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
      const parsedId = getWasmAttribute("proposal_id", res.rawLog);
      const numId = idParamToNum(parsedId);

      console.log(numId);

      if (numId === 0) throw new Error("Failed to get proposal id");
      const generatedToken = createAuthToken("angelprotocol-web-app");
      const response = await fetch(APIs.apes + "/withdraw", {
        method: "POST",
        headers: { authorization: generatedToken },
        body: JSON.stringify({ ...payload, proposal_id: numId }),
      });

      dispatch(
        setStage({
          step: "success",
          message: "Withdraw proposal submitted",
          txHash: res.transactionHash,
          chain: wallet.chain,
          successLink: proposalLink,
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
          message: `Failed to log created withdraw proposal. Contact support@angelprotocol.io`,
          txHash: res.transactionHash,
        })
      );
    }
  }
);
