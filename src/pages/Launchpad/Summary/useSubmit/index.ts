import type { BigNumber } from "@ethersproject/bignumber";
import { useNavigate } from "react-router-dom";
import { Completed, Network } from "slices/launchpad/types";
import { Chain } from "types/aws";
import { SimulContractTx } from "types/evm";
import { TxContent, TxSuccess } from "types/tx";
import { useSaveAIFMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import Account from "contracts/Account";
import { createTx } from "contracts/createTx/createTx";
import { accounts } from "contracts/evm/Account";
import useTxSender from "hooks/useTxSender";
import { logger } from "helpers";
import { chainIds } from "constants/chainIds";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";
import toEVMAIF from "./toEVMAIF";
import toJunoAIF from "./toJunoAIF";

export default function useSubmit(network: Network) {
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
        network === "polygon" &&
        !(chain.chain_id === chainIds.polygon || chain.chain_id === "1337") //polygon local
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

      if (network === "juno" && chain.chain_id !== chainIds.juno) {
        return showModal(TxPrompt, {
          error: "Please connect to Juno network",
        });
      }

      // //////////////// CONSTRUCT TX CONTENT ////////////////////
      let content: TxContent;
      if (
        network === "polygon" /**TODO: && check connected wallet's chainID */
      ) {
        const tx: SimulContractTx = createTx(
          wallet.address,
          "accounts.create-endowment",
          toEVMAIF(completed, wallet.address)
        );
        content = {
          type: "evm",
          val: tx,
          log(logs) {
            const ev = accounts.getEvent("EndowmentCreated");
            const topic = accounts.getEventTopic(ev);
            const log = logs.find((log) => log.topics.includes(topic));
            if (!log) return null;
            const [id] = accounts.decodeEventLog(ev, log.data, log.topics);
            return (id as BigNumber).toString();
          },
        };
      } else {
        const contract = new Account(wallet);
        const msg = contract.createNewAIFmsg(
          toJunoAIF(completed, wallet.address)
        );
        content = { type: "cosmos", val: [msg], attribute: "endow_id" };
      }

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
        content,
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
