import { FormValues } from "./types";
import { AccountType } from "types/contracts";
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

export default function useInvest(type: AccountType) {
  const { cw3, endowmentId, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function invest(data: FormValues) {
    const account = new Account(wallet);
    const msg = account.createEmbeddedInvestMsg({
      id: endowmentId,
      acct_type: type,
      vaults: data.investments.map((inv) => [
        inv.vault,
        //NOTE: assumed native, since asset type is not indicated in EndowmentBalance
        { info: { native: "ujunox" }, amount: scaleToStr(inv.amount) },
      ]),
    });
    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Update strategy",
      `update stratey of endowment: ${endowmentId}`,
      [msg]
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
