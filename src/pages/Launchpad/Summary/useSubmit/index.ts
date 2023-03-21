import { useNavigate } from "react-router-dom";
import { Completed, Network } from "slices/launchpad/types";
import { useSaveAIFMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import Account from "contracts/Account";
import useCosmosTxSender, { Tx } from "hooks/useCosmosTxSender";
import { getWasmAttribute } from "helpers";
import { EMAIL_SUPPORT, GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";
import toJunoAIF from "./toJunoAIF";

export default function useSubmit(network: Network) {
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
  const [saveAIF] = useSaveAIFMutation();
  const { showModal, closeModal } = useModalContext();
  const navigate = useNavigate();

  async function submit(completed: Completed) {
    if (network === "polygon") {
      return alert("Work in progress for polygon submission");
    }

    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
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
