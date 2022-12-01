import { createAsyncThunk } from "@reduxjs/toolkit";
import { TxOptions } from "types/slices";
import { apesTags, invalidateApesTags } from "services/apes";
import { WalletState } from "contexts/WalletContext";
import Contract from "contracts/Contract";
import { logger } from "helpers";
import gift, { SubmitStep, TxStatus, setTxStatus } from "./index";

type Args = {
  wallet: WalletState;
  tx: TxOptions;
  donation: SubmitStep;
};

export const purchase = createAsyncThunk<void, Args>(
  `${gift.name}/purchase`,
  async ({ wallet, tx, donation: { details } }, { dispatch }) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };

    try {
      updateTx({ loadingMsg: "Payment is being processed..." });
      const contract = new Contract(wallet);
      const response = await contract.signAndBroadcast(tx);
      if (!response.code) {
        updateTx({ code: "" });

        //invalidate user balance
        dispatch(invalidateApesTags([{ type: apesTags.chain }]));
      } else {
        updateTx("error");
      }
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  }
);
