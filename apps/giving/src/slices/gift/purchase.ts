import Contract from "@/contracts/Contract";
import { invalidateApesTags } from "@/services/apes";
import { APIs } from "@ap/constants";
import { WalletState } from "@ap/contexts/wallet-context";
import { createAuthToken, getWasmAttribute, logger } from "@ap/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TxOptions } from "@ap/types";
import gift, { GiftDetails, TxStatus, setTxStatus } from "./index";

type Args = {
  wallet: WalletState;
  tx: TxOptions;
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
      const contract = new Contract(wallet);
      const response = await contract.signAndBroadcast(tx);
      if (!response.code) {
        /** recipient is specified, show tx link to purchaser */
        if (details.recipient) {
          return updateTx({ hash: response.transactionHash });
        }

        /**if no recipient is provided */
        /** extract deposit id */
        const id = getWasmAttribute("deposit_id", response.rawLog);
        /** generate secret */
        const randNums = window.crypto.getRandomValues(new BigUint64Array(62));
        const preImage = `${randNums[0]}${randNums[1]}`;
        const secret = `ap-${details.chainId}-${preImage}`;

        updateTx({ msg: "Processing giftcard code..." });
        const res = await fetch(APIs.aws + "/v1/giftcard/deposit", {
          headers: {
            authorization: createAuthToken("angelprotocol-web-app"),
          },
          method: "POST",
          body: JSON.stringify({
            secret,
            depositId: Number(id!),
            chain: details.chainId,
          }),
        });

        if (!res.ok) {
          return updateTx({
            error: `Failed to save gift card code. Kindly contact support@angelprotocol.io. Transaction: ${response.transactionHash}`,
          });
        }
        /** no problems, save giftcard code on user's computer */
        saveCode(secret);
        /** show gift card code to user */
        updateTx({ secret });
      } else {
        updateTx({
          error:
            "The payment wasn’t processed. Please double check your payment details or change your payment method and try again.",
        });
      }
    } catch (err) {
      logger.error(err);
      updateTx({ error: "Unexpected error occured. Please try again later." });
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
