import { parseRawLog } from "@cosmjs/stargate/build/logs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import transactionSlice, {
  setStage,
} from "slices/transaction/transactionSlice";
import { createAuthToken } from "helpers";
import { APIs } from "constants/urls";

export const logWithdrawProposal = createAsyncThunk(
  `${transactionSlice.name}/logWithdrawProposal`,
  async (
    {
      rawLog,
      ...payload
    }: {
      rawLog?: string;
      endowment_multisig: string;
      proposal_chain_id: string;
      target_chain: string;
      target_wallet: string;
    },
    { dispatch }
  ) => {
    try {
      //set to helper
      const logs = parseRawLog(rawLog);
      const proposal_id = logs[0]?.events
        .find((event) => {
          return event.type === "wasm";
        })
        ?.attributes.find((attribute) => {
          return attribute.key === "proposal_id";
        })?.value as string;

      const generatedToken = createAuthToken("angelprotocol-web-app");
      const response = await fetch(APIs.apes + "/withdraw", {
        method: "POST",
        headers: { authorization: generatedToken },
        body: JSON.stringify({ ...payload, proposal_id: +proposal_id }),
      });

      //success = 2xx
      if (response.status < 200 || response.status > 299) {
        throw new Error();
      }
    } catch (err) {
      dispatch(
        setStage({
          step: "error",
          message: `Failed to log withdraw proposal. Contact support@angelprotocol.io`,
        })
      );
    }
  }
);
