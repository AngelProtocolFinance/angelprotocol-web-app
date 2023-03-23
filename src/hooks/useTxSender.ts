import { useState } from "react";
import { SenderArgs, isTxResultError } from "types/tx";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Popup from "components/Popup";
import { TxPrompt } from "components/Prompt";
import { useSetter } from "store/accessors";
import { logger } from "helpers";
import { estimateTx, sendTx as signAndBroadCast } from "helpers/tx";
import { GENERIC_ERROR_MESSAGE } from "constants/common";

type Sender = (args: SenderArgs) => Promise<void>;

export default function useTxSender<T extends boolean = false>(
  isSenderInModal: T = false as any
): T extends true ? { sendTx: Sender; isSending: boolean } : Sender {
  const { wallet } = useGetWallet();
  /** use this state to show loading to modal forms */
  const [isSending, setIsSending] = useState(false);
  const { showModal, setModalOption } = useModalContext();
  const dispatch = useSetter();

  const sendTx: Sender = async ({
    content,
    tagPayloads,
    onSuccess,
    isAuthorized,
    successMeta,
  }) => {
    try {
      if (!wallet) {
        return showModal(TxPrompt, { error: "Wallet is not connected" });
      }

      if (!isAuthorized /** should be explicitly set to true to pass */) {
        return showModal(TxPrompt, {
          error: "You are not authorized to make this transaction",
        });
      }
      if (content.type !== "cosmos") {
        return showModal(TxPrompt, {
          error: "Please connect to Juno to make this transaction",
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

      // //////////////// ESTIMATE TX  ////////////////////
      const estimate = await estimateTx(content, wallet);
      if (!estimate) {
        return showModal(TxPrompt, {
          error: "Simulation failed. Transaction likely to fail",
        });
      }
      const { fee, tx } = estimate;

      if (fee.amount > wallet.displayCoin.balance) {
        return showModal(Popup, {
          message: "Not enough balance to pay for fees",
        });
      }

      // //////////////// SEND TX  ////////////////////
      const result = await signAndBroadCast(wallet, tx);

      if (isTxResultError(result)) {
        return showModal(TxPrompt, result);
      }

      for (const tagPayload of tagPayloads || []) {
        dispatch(tagPayload);
      }

      if (onSuccess) {
        onSuccess(result, wallet.chain);
      } else {
        showModal(TxPrompt, {
          success: successMeta || { message: "Transaction successful!" },
          tx: result,
        });
      }
    } catch (err) {
      logger.error(err);
      showModal(TxPrompt, { error: GENERIC_ERROR_MESSAGE });
    } finally {
      isSenderInModal && setIsSending(false);
    }
  };

  return isSenderInModal ? { sendTx, isSending } : (sendTx as any);
}
