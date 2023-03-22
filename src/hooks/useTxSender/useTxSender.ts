import { useState } from "react";
import { SenderArgs, isTxError } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { useSetter } from "store/accessors";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import estimateTx from "./estimateTx/estimateTx";
import signAndBroadcast from "./sendTx/sendTx";

type Sender = (args: SenderArgs) => Promise<void>;

export default function useTxSender<T extends boolean = false>(
  isSenderInModal: T = false as any
): T extends true ? { sendTx: Sender; isSending: boolean } : Sender {
  /** use this state to show loading to modal forms */
  const [isSending, setIsSending] = useState(false);
  const { showModal, setModalOption } = useModalContext();
  const dispatch = useSetter();

  /**
   * whether wallet is connected, user is authorized,
   * or wallet is connected to the correct chain, must be checked before calling this function
   */
  const sendTx: Sender = async ({
    wallet,
    tx: txContent,
    tagPayloads,
    successMeta,
  }) => {
    try {
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

      const estimate = await estimateTx(
        txContent,
        wallet /** terra isn't supported in this hook */
      );

      if (!estimate) {
        return showModal(TxPrompt, {
          error: "Simulation failed. Transaction is likely to fail",
        });
      }

      const { fee, tx } = estimate;
      if (fee.amount > wallet.displayCoin.balance) {
        return showModal(TxPrompt, {
          error: "Not enough balance to pay for fees",
        });
      }

      const result = await signAndBroadcast(wallet, tx);

      if (isTxError(result)) {
        return showModal(TxPrompt, { error: result.error, tx: result.tx });
      }

      //always invalidate cached chain data to reflect balance changes from fee deduction
      dispatch(invalidateApesTags(["chain"]));

      for (const tagPayload of tagPayloads || []) {
        dispatch(tagPayload);
      }

      showModal(TxPrompt, {
        success: successMeta || { message: "Transaction successful!" },
        tx: { hash: result.hash, chainID: result.chainID },
      });
    } catch (err) {
      showModal(TxPrompt, { error: GENERIC_ERROR_MESSAGE });
    } finally {
      isSenderInModal && setIsSending(false);
    }
  };

  return isSenderInModal ? { sendTx, isSending } : (sendTx as any);
}
