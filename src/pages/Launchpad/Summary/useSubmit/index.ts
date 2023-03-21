import { useNavigate } from "react-router-dom";
import { Completed, Network } from "slices/launchpad/types";
import { SimulContractTx } from "types/evm";
import { useSaveAIFMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import Account from "contracts/Account";
import { createEndowment } from "contracts/evm/Account";
import useCosmosTxSender, { Tx } from "hooks/useCosmosTxSender";
import { getWasmAttribute } from "helpers";
import { estimateFee, sendTx as sendEVMTX } from "helpers/evm";
import { EMAIL_SUPPORT, GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";
import toEVMAIF from "./toEVMAIF";
import toJunoAIF from "./toJunoAIF";

export default function useSubmit(network: Network) {
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
  const [saveAIF] = useSaveAIFMutation();
  const { showModal, closeModal } = useModalContext();
  const navigate = useNavigate();

  async function submit(completed: Completed) {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

    if (network === "polygon" /**TODO: && check connected wallet's chainID */) {
      const tx: SimulContractTx = {
        to: "0x09266441B8Dc93EE70Dbe27A3612eA6e1116f1F3", //TODO: move to src/contracts/evm
        from: wallet.address,
        data: createEndowment.encode(toEVMAIF(completed, wallet.address)),
      };
      const { tx: simulated } = await estimateFee(wallet, tx);
      const hash = await sendEVMTX(wallet, simulated);
      return alert(hash);
    }

    if (!(wallet.providerId === "keplr" || wallet.providerId === "keplr-wc")) {
      return showModal(TxPrompt, {
        error: "Only Keplr wallet support this transaction",
      });
    }

    const contract = new Account(wallet);
    const msg = contract.createNewAIFmsg(toJunoAIF(completed, wallet.address));
    await sendTx({
      msgs: [msg],
      isAuthorized: true /** anyone can send this msg */,
      async onSuccess(res, chain) {
        try {
          const id = getWasmAttribute("endow_id", res.rawLog);

          showModal(
            TxPrompt,
            { loading: "Saving endowment info.." },
            { isDismissible: false }
          );

          const result = await saveAIF({
            chainId: chain.chain_id,
            id: +id!,
            registrant: wallet.address,
            tagline: completed[1].tagline,
          });

          const tx: Tx = { hash: res.transactionHash, chainID: chain.chain_id };
          if ("error" in result) {
            return showModal(TxPrompt, {
              error: `Failed to save created endowment. Please contact us at ${EMAIL_SUPPORT}`,
              tx,
            });
          }

          closeModal();
          navigate(`${appRoutes.register}/success`, { state: id });
        } catch (err) {
          showModal(TxPrompt, { error: GENERIC_ERROR_MESSAGE });
        }
      },
    });
  }

  return submit;
}
