import { useState } from "react";
import { Tx, TxArgs } from "./types";
import { invalidateApesTags } from "services/apes";
import { isConnected, useWalletContext } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { useSetter } from "store/accessors";
import useErrorHandler from "hooks/useErrorHandler";
import { estimateGas } from "helpers/cosmos/estimateGas";
import { sendTx as signAndBroadcast } from "helpers/cosmos/sendTx";

type Sender = (args: TxArgs) => Promise<void>;

export default function useCosmosTxSender<T extends boolean = false>(
  isSenderInModal: T = false as any
): T extends true ? { sendTx: Sender; isSending: boolean } : Sender {
  const wallet = useWalletContext();
  /** use this state to show loading to modal forms */
  const [isSending, setIsSending] = useState(false);
  const { handleError, showModal, setModalOption } = useErrorHandler();
  const dispatch = useSetter();

  const sendTx: Sender = async ({
    msgs,
    tagPayloads,
    onSuccess,
    successMeta,
  }) => {
    try {
      if (!isConnected(wallet)) {
        return showModal(TxPrompt, { error: "Wallet is not connected" });
      }
      if (wallet.type !== "cosmos") {
        return showModal(TxPrompt, {
          error: "Connected wallet doesn't support this transaction",
        });
      }

      /**
       * avoid unmounting sender in modal while tx is still sending to avoid memory leak
       * sender should be responsible showing something is being submitted
       *
       * in this hook: modal is forced to be indisimissble when submitting
       */

      if (isSenderInModal) {
        setIsSending(true);
        setModalOption("isDismissible", false);
      } else {
        showModal(
          TxPrompt,
          { loading: "Sending transaction.." },
          { isDismissible: false }
        );
      }

      const { doc } = await estimateGas(msgs, wallet);
      const response = await signAndBroadcast(wallet, doc);

      const txRes: Tx = {
        hash: response.txhash,
        chainID: wallet.chainId,
      };

      if (!!response.code) {
        showModal(TxPrompt, { error: "Transaction failed", tx: txRes });
      } else {
        //always invalidate cached chain data to reflect balance changes from fee deduction
        dispatch(invalidateApesTags(["balances"]));

        /** invalidate custom cache entries, after some delay so that query result
              would reflect the changes made */
        await new Promise((r) => {
          setTimeout(r, 3000);
        });
        for (const tagPayload of tagPayloads || []) {
          dispatch(tagPayload);
        }

        if (onSuccess) {
          onSuccess(response, wallet.chainId);
        } else {
          showModal(TxPrompt, {
            success: successMeta || { message: "Transaction successful!" },
            tx: txRes,
          });
        }
      }
    } catch (err) {
      handleError(err);
    } finally {
      isSenderInModal && setIsSending(false);
    }
  };

  return isSenderInModal ? { sendTx, isSending } : (sendTx as any);
}
