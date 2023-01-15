import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignDoc } from "types/cosmos";
import { invalidateApesTags } from "services/apes";
import { CosmosWallet } from "contexts/WalletContext";
import { createAuthToken, getWasmAttribute, logger } from "helpers";
import { sendTx } from "helpers/cosmos/sendTx";
import { APIs } from "constants/urls";
import gift, { GiftDetails, TxStatus, setTxStatus } from "./index";

type Args = {
  wallet: CosmosWallet;
  doc: SignDoc;
  details: GiftDetails;
};

export const purchase = createAsyncThunk<void, Args>(
  `${gift.name}/purchase`,
  async ({ wallet, doc, details }, { dispatch }) => {
    const updateTx = (status: TxStatus) => {
      dispatch(setTxStatus(status));
    };
    try {
      updateTx({ msg: "Payment is being processed..." });
      const txRes = await sendTx(wallet, doc);

      invalidateApesTags(["balances"]);

      if (!txRes.code) {
        /** recipient is specified, show tx link to purchaser */
        if (details.recipient) {
          return updateTx({ hash: txRes.txhash });
        }

        /**if no recipient is provided */
        /** extract deposit id */
        const id = getWasmAttribute("deposit_id", txRes.logs);
        /** generate secret */
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
            depositId: Number(id!),
            chain: details.chainId,
          }),
        });

        if (!res.ok) {
          return updateTx({
            error: `Failed to save gift card code. Kindly contact support@angelprotocol.io. Transaction: ${txRes.txhash}`,
          });
        }
        /** no problems, show gift card code to user */
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
      dispatch(invalidateApesTags(["balances"]));
    }
  }
);
