import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { useState } from "react";
import { Tx, TxArgs } from "./types";
import { apesTags, invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { isConnected, useWalletContext } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { useSetter } from "store/accessors";
import handleTxError from "./handleTxError";

type Sender = (args: TxArgs) => Promise<void>;

export default function useCosmosTxSender<T extends boolean = false>(
  isSenderInModal: T = false as any
): T extends true ? { sendTx: Sender; isSending: boolean } : Sender {
  const wallet = useWalletContext();
  /** use this state to show loading to modal forms */
  const [isSending, setIsSending] = useState(false);
  const { showModal, setModalOption } = useModalContext();
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

      const response = await wallet.client.signAndBroadcast(
        wallet.address,
        msgs,
        "auto"
      );

      const txRes: Tx = {
        hash: response.transactionHash,
        chainID: wallet.chainId,
      };

      if (isDeliverTxSuccess(response)) {
        //always invalidate cached chain data to reflect balance changes from fee deduction
        dispatch(invalidateApesTags([{ type: apesTags.chain }]));

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
      } else {
        showModal(TxPrompt, { error: "Transaction failed", tx: txRes });
      }
    } catch (err) {
      handleTxError(err, ({ error, tx }) => showModal(TxPrompt, { error, tx }));
    } finally {
      isSenderInModal && setIsSending(false);
    }
  };

  return isSenderInModal ? { sendTx, isSending } : (sendTx as any);
}
