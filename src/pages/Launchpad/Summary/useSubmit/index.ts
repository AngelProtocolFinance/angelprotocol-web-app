import { useNavigate } from "react-router-dom";
import { Completed } from "slices/launchpad/types";
import { Chain } from "types/aws";
import { TxSuccess } from "types/tx";
import { useSaveAIFMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { Account } from "contracts/evm";
import useTxSender from "hooks/useTxSender";
import { logger } from "helpers";
import { chainIds } from "constants/chainIds";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";
import toEVMAIF from "./toEVMAIF";

export default function useSubmit() {
  const { wallet } = useGetWallet();
  const [saveAIF] = useSaveAIFMutation();
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

      const account = new Account(
        "0xf725Ff6235D53dA06Acb4a70AA33206a1447D550",
        wallet
      );

      // //////////////// CONSTRUCT TX CONTENT ////////////////////
      const tx = account.createCreateEndowmentTx(
        toEVMAIF(completed, wallet.address)
      );

      const onSuccess = async (result: TxSuccess, chain: Chain) => {
        // //////////////// LOG NEW AIF TO AWS ////////////////////
        const { attrValue: endowId, ...okTx } = result;
        if (!endowId) {
          return showModal(TxPrompt, {
            error: "Endowment was created but failed to save to AWS",
            tx: okTx,
          });
        }

        const saveResult = await saveAIF({
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
          log: (logs) => Account.decodeEvent("EndowmentCreated", logs)?.endowId,
        },
        isAuthorized: true,
        onSuccess,
      });
    } catch (err) {
      logger.error(err);
      showModal(TxPrompt, { error: GENERIC_ERROR_MESSAGE });
    }
  }

  return submit;
}
