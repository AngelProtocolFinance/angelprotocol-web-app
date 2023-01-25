import { useState } from "react";
import { Tx, TxArgs } from "./types";
import { TxOptions } from "types/slices";
import { invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Popup from "components/Popup";
import { TxPrompt } from "components/Prompt/TxPrompt";
import { useSetter } from "store/accessors";
import Contract from "contracts/Contract";
import { extractFeeAmount } from "helpers";
import handleTxError from "./handleTxError";

type Sender = (args: TxArgs) => Promise<void>;

export default function useCosmosTxSender<T extends boolean = false>(
  isSenderInModal: T = false as any
): T extends true ? { sendTx: Sender; isSending: boolean } : Sender {
  const { wallet } = useGetWallet();
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
      if (!wallet) {
        return showModal(TxPrompt, { error: "Wallet is not connected" });
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

      const contract = new Contract(wallet);

      const fee = await contract.estimateFee(msgs);
      const feeAmount = extractFeeAmount(
        fee,
        wallet.chain.native_currency.token_id
      );

      if (feeAmount > wallet.displayCoin.balance) {
        return showModal(Popup, {
          message: "Not enough balance to pay for fees",
        });
      }

      const tx: TxOptions = { msgs: msgs, fee };
      const response = await contract.signAndBroadcast(tx);

      const txRes: Tx = {
        hash: response.transactionHash,
        chainID: wallet.chain.chain_id,
      };

      if (!response.code) {
        //always invalidate cached chain data to reflect balance changes from fee deduction
        dispatch(invalidateApesTags(["chain"]));

        /** invalidate custom cache entries, after some delay so that query result
              would reflect the changes made */
        await new Promise((r) => {
          setTimeout(r, 3000);
        });
        for (const tagPayload of tagPayloads || []) {
          dispatch(tagPayload);
        }

        if (onSuccess) {
          onSuccess(response, wallet.chain);
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
