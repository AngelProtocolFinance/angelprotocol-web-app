import { createAsyncThunk } from "@reduxjs/toolkit";
import { EstimatedTx, isTxResultError } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { WalletState } from "contexts/WalletContext";
import { createAuthToken, logger } from "helpers";
import { sendTx } from "helpers/tx";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { EMAIL_SUPPORT } from "constants/env";
import { APIs } from "constants/urls";
import gift, { GiftDetails, TxStatus, setTxStatus } from "./index";

type Args = {
  wallet: WalletState;
  tx: EstimatedTx;
  details: GiftDetails;
};

export const purchase = createAsyncThunk<void, Args>(
  `${gift.name}/purchase`,
  async ({ wallet, tx, details }, { dispatch }) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };

    try {
      updateTx({ msg: "Payment is being processed..." });
      const result = await sendTx(wallet, tx);

      if (isTxResultError(result)) {
        return updateTx({ error: result.error });
      }

      const { hash, data } = result;
      const depositID = data as null | string;
      if (details.recipient) {
        return updateTx({ hash: result.hash });
      }

      if (!depositID) {
        return updateTx({
          error: `Failed to save gift card code. Kindly contact ${EMAIL_SUPPORT}. Transaction: ${hash}`,
        });
      }

      let randNums = window.crypto.getRandomValues(new BigUint64Array(62));
      let preImage = `${randNums[0]}${randNums[1]}`;
      let secret = `ap-${details.chainId}-${preImage}`;

      updateTx({ msg: "Processing giftcard code..." });
      const res = await fetch(APIs.aws + "/v1/giftcard/deposit", {
        headers: {
          authorization: createAuthToken("angelprotocol-web-app"),
        },
        method: "POST",
        body: JSON.stringify({
          secret,
          depositId: Number(depositID),
          chain: details.chainId,
        }),
      });

      if (!res.ok) {
        return updateTx({
          error: `Failed to save gift card code. Kindly contact ${EMAIL_SUPPORT}. Transaction: ${hash}`,
        });
      }

      /** no problems, save giftcard code on user's computer */
      saveCode(secret);
      /** show gift card code to user */
      updateTx({ secret });
    } catch (err) {
      logger.error(err);
      updateTx({ error: GENERIC_ERROR_MESSAGE });
    } finally {
      /** invalidate user balance */
      dispatch(invalidateApesTags(["chain"]));
    }
  }
);

function saveCode(code: string) {
  const a = document.createElement("a");
  a.setAttribute("download", "giftcard-code.txt");
  const content = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(content);
  a.href = url;

  a.click();
  //cleanup
  URL.revokeObjectURL(a.href);
}
