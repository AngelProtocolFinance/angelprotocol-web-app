import { DeliverTxResponse } from "@cosmjs/stargate";
import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const logEndowmentId = createAsyncThunk(
  `${transactionSlice.name}/logEndowmentId`,
  async (
    args: { res: DeliverTxResponse; wallet: WalletState; PK: string },
    { dispatch }
  ) => {
    try {
      dispatch(setStage({ step: "submit", message: "Saving endowment id" }));

      const parsedId = getWasmAttribute("endow_id", args.res.rawLog);
      const numId = idParamToNum(parsedId);
      if (numId === 0) throw new Error("Failed to get endowment id");

      const generatedToken = createAuthToken("charity-owner");
      const response = await fetch(
        `${APIs.aws}/registration/${args.PK}/submit`,
        {
          method: "POST",
          body: JSON.stringify({
            EndowmentId: numId,
          }),
          headers: { authorization: generatedToken },
        }
      );

      dispatch(
        setStage({
          step: "success",
          message: "Endowment submitted for review",
          txHash: args.res.transactionHash,
          chain: args.wallet.chain,
        })
      );
      //success = 2xx
      if (response.status < 200 || response.status > 299) {
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
