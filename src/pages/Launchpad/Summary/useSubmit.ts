import type { BigNumber } from "@ethersproject/bignumber";
import { useNavigate } from "react-router-dom";
import { Completed } from "slices/launchpad/types";
import { TxOnSuccess } from "types/tx";
import { useSaveASTMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx } from "contracts/createTx/createTx";
import { accounts } from "contracts/evm/Account";
import useTxSender from "hooks/useTxSender";
import { logger } from "helpers";
import { chainIds } from "constants/chainIds";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";
import toEVMAST from "./toEVMAST";

export default function useSubmit() {
  const { wallet } = useGetWallet();
  const [saveAST] = useSaveASTMutation();
  const { showModal, closeModal } = useModalContext();
  const navigate = useNavigate();
  const sendTx = useTxSender();

  async function submit(completed: Completed) {
    try {
      if (!wallet) {
        return showModal(TxPrompt, { error: "Wallet is not connected" });
      }

      const { chain } = wallet;
      if (
        chain.chain_id !== chainIds.polygon //polygon local
      ) {
        /** TODO: wallet state should have `type: ("evm" | "cosmos" ..etc)` field
         *  so the flow would be
         *  1. Connected wallet doesn't support (non-EVM) this transaction
         *  2. Please connect to Polygon network
         *
         *  if PRE-CHECK ( UI is disabled + helpful toolip)
         *  no need to perform these checks but value must be casted
         *  const wallet = useGetWallet() as EVM/CosmosWalletConnectedToCorrectNetwork
         */
        return showModal(TxPrompt, {
          error: "Please connect to Polygon network",
        });
      }

      // //////////////// CONSTRUCT TX CONTENT ////////////////////

      const tx = createTx(
        wallet.address,
        "accounts.create-endowment",
        toEVMAST(completed, wallet.address)
      );

      const onSuccess: TxOnSuccess = async (result, chain) => {
        // //////////////// LOG NEW AST TO AWS ////////////////////
        const { data, ...okTx } = result;
        const endowId = data as string | null;
        if (!endowId) {
          return showModal(TxPrompt, {
            error:
              "Failed to get id: endowment was created but failed to save to AWS",
            tx: okTx,
          });
        }

        const saveResult = await saveAST({
          chainId: chain.chain_id,
          id: +endowId,
          registrant: wallet.address,
          tagline: completed[1].tagline,
        });

        if ("error" in saveResult) {
          return showModal(TxPrompt, {
            error: "Endowment was created but failed to save to AWS",
            tx: okTx,
          });
        }

        closeModal();
        navigate(`${appRoutes.register}/success`, { state: endowId });
      };

      // //////////////// SEND TRANSACTION  ////////////////////
      await sendTx({
        content: {
          type: "evm",
          val: tx,
          log: (logs) => {
            const ev = accounts.getEvent("EndowmentCreated");
            const topic = accounts.getEventTopic(ev);
            const log = logs.find((log) => log.topics.includes(topic));
            if (!log) return null;
            const [id] = accounts.decodeEventLog(ev, log.data, log.topics);
            return (id as BigNumber).toString();
          },
        },
        onSuccess,
      });
    } catch (err) {
      logger.error(err);
      showModal(TxPrompt, { error: GENERIC_ERROR_MESSAGE });
    }
  }

  return submit;
}
