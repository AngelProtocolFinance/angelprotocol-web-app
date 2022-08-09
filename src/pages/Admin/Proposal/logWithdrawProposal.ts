import { createAsyncThunk } from "@reduxjs/toolkit";
import transactionSlice, {
  setStage,
} from "slices/transaction/transactionSlice";
import createAuthToken from "helpers/createAuthToken";
import { APIs } from "constants/urls";

export const logWithdrawProposal = createAsyncThunk(
  `${transactionSlice.name}/logWithdrawProposal`,
  async (
    payload: {
      proposal_id: number;
      proposal_chain_id: string;
      endowment_multisig: string;
    },
    { dispatch }
  ) => {
    try {
      const generatedToken = createAuthToken("angelprotocol-web-app");
      const response = await fetch(APIs.apes + "/withdraw", {
        method: "POST",
        headers: { authorization: generatedToken },
        body: JSON.stringify(payload),
      });

      //success = 2xx
      if (response.status < 200 || response.status > 299) {
        throw new Error();
      }
    } catch (err) {
      dispatch(
        setStage({
          step: "error",
          message: `Failed to log withdraw proposal. Kindly reject transaction and contact support@angelprotocol.io`,
        })
      );
    }
  }
);
