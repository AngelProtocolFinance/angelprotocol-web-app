import { FormValues } from "./types";
import { EmbeddedWasmMsg } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { scaleToStr } from "helpers";

export default function useRedeem() {
  const { cw3, endowmentId, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function invest(data: FormValues) {
    const account = new Account(wallet);

    let msgs: EmbeddedWasmMsg[] = [];

    //at least one of investment types is filled prior to submission
    if (data.liquid.length > 0) {
      msgs.push(
        account.createEmbeddedRedeemMsg({
          id: endowmentId,
          acct_type: "liquid",
          vaults: data.liquid.map(({ vault, amount }) => [
            vault,
            scaleToStr(amount),
          ]),
        })
      );
    }

    if (data.locked.length > 0) {
      msgs.push(
        account.createEmbeddedRedeemMsg({
          id: endowmentId,
          acct_type: "locked",
          vaults: data.locked.map(({ vault, amount }) => [
            vault,
            scaleToStr(amount),
          ]),
        })
      );
    }

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Update strategy",
      `update stratey of endowment: ${endowmentId}`,
      msgs
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposal],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        //Juno withdrawal
        successLink: proposalLink,
        successMessage: "Strategy update proposal successfully created!",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    invest,
  };
}
