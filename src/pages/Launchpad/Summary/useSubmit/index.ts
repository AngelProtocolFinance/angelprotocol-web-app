import { useNavigate } from "react-router-dom";
import { Completed, Network } from "slices/launchpad/types";
import { SimulContractTx } from "types/evm";
import { TxContent, isTxError } from "types/tx";
import { useSaveAIFMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import Account from "contracts/Account";
import { createEndowment } from "contracts/evm/Account";
import { estimateTx, sendTx } from "helpers/tx";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";
import toEVMAIF from "./toEVMAIF";
import toJunoAIF from "./toJunoAIF";

export default function useSubmit(network: Network) {
  const { wallet } = useGetWallet();
  const [saveAIF] = useSaveAIFMutation();
  const { showModal, closeModal } = useModalContext();
  const navigate = useNavigate();

  async function submit(completed: Completed) {
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
    if (network === "polygon" /**TODO: && check connected wallet's chainID */) {
      const tx: SimulContractTx = {
        to: "0x09266441B8Dc93EE70Dbe27A3612eA6e1116f1F3", //TODO: move to src/contracts/evm
        from: wallet.address,
        data: createEndowment.encode(toEVMAIF(completed, wallet.address)),
      };
      content = { type: "evm", val: tx };
    } else {
      const contract = new Account(wallet);
      const msg = contract.createNewAIFmsg(
        toJunoAIF(completed, wallet.address)
      );
      content = { type: "cosmos", val: [msg] };
    }

    // //////////////// SEND TRANSACTION  ////////////////////
    showModal(
      TxPrompt,
      { loading: "Sending transaction.." },
      { isDismissible: false }
    );
    const estimate = await estimateTx(content, wallet);

    if (!estimate) {
      return showModal(TxPrompt, {
        error: "Simulation failed: transaction likely to fail",
      });
    }
    const { fee, tx } = estimate;

    if (fee.amount > wallet.displayCoin.balance) {
      return showModal(TxPrompt, {
        error: "Not enough balance to pay for fees",
      });
    }

    const result = await sendTx(wallet, tx);

    if (isTxError(result)) {
      return showModal(TxPrompt, { error: result.error });
    }

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
  }

  return submit;
}
