import { useState } from "react";
import { SenderArgs } from "types/tx";
import { invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Popup from "components/Popup";
import { TxPrompt } from "components/Prompt";
import { useSetter } from "store/accessors";
import { chainIds } from "constants/chainIds";
import estimateTx from "./estimateTx/estimateTx";

type Sender = (args: SenderArgs) => Promise<void>;

const supportedChains: string[] = [chainIds.juno, chainIds.polygon];

export default function useTxSender<T extends boolean = false>(
  isSenderInModal: T = false as any
): T extends true ? { sendTx: Sender; isSending: boolean } : Sender {
  const { wallet } = useGetWallet();
  /** use this state to show loading to modal forms */
  const [isSending, setIsSending] = useState(false);
  const { showModal, setModalOption } = useModalContext();
  const dispatch = useSetter();

  const sendTx: Sender = async ({
    tx: txContent,
    tagPayloads,
    isAuthorized,
    successMeta,
  }) => {
    try {
      if (!wallet) {
        return showModal(TxPrompt, { error: "Wallet is not connected" });
      }
      const { chain } = wallet;

      if (!supportedChains.includes(chain.chain_id)) {
        return showModal(TxPrompt, {
          error: "Connected wallet doesn't support this transaction",
        });
      }

      if (!isAuthorized /** should be explicitly set to true to pass */) {
        return showModal(TxPrompt, {
          error: "You are not authorized to make this transaction",
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

      const estimate = await estimateTx(
        txContent,
        wallet /** terra isn't supported in this hook */
      );

      if (!estimate) {
        return showModal(Popup, {
          message: "Simulation failed. Transaction is likely to fail",
        });
      }

      if (estimate.fee.amount > wallet.displayCoin.balance) {
        return showModal(Popup, {
          message: "Not enough balance to pay for fees",
        });
      }

      // const tx: TxOptions = { msgs: msgs, fee };
      // const response = await contract.signAndBroadcast(tx);

      // const txRes: Tx = {
      //   hash: response.transactionHash,
      //   chainID: wallet.chain.chain_id,
      // };

      //always invalidate cached chain data to reflect balance changes from fee deduction
      dispatch(invalidateApesTags(["chain"]));

      for (const tagPayload of tagPayloads || []) {
        dispatch(tagPayload);
      }

      showModal(TxPrompt, {
        success: successMeta || { message: "Transaction successful!" },
        tx: txRes,
      });
    } catch (err) {
      handleTxError(err, ({ error, tx }) => showModal(TxPrompt, { error, tx }));
    } finally {
      isSenderInModal && setIsSending(false);
    }
  };

  return isSenderInModal ? { sendTx, isSending } : (sendTx as any);
}
