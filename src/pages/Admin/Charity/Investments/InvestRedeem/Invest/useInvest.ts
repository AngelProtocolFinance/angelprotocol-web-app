import { FormValues, Investment } from "./types";
import { AccountType, EmbeddedWasmMsg, InvestPayload } from "types/contracts";
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

export default function useInvest() {
  const { cw3, endowmentId, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  function invest(data: FormValues) {
    const account = new Account(wallet);

    let msgs: EmbeddedWasmMsg[] = [];
    const liquidInvestments = getInvestmentsWithType(
      data.investments,
      "liquid"
    );
    const lockedInvestments = getInvestmentsWithType(
      data.investments,
      "locked"
    );

    //at least one of investment types is filled prior to submission
    if (liquidInvestments.length > 0) {
      msgs.push(
        account.createEmbeddedInvestMsg({
          id: endowmentId,
          acct_type: "liquid",
          vaults: getInvestmentsWithType(data.investments, "liquid"),
        })
      );
    }

    if (lockedInvestments.length > 0) {
      msgs.push(
        account.createEmbeddedInvestMsg({
          id: endowmentId,
          acct_type: "locked",
          vaults: getInvestmentsWithType(data.investments, "locked"),
        })
      );
    }

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Invest",
      `Redeem funds for endowment: ${endowmentId}`,
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
        successMessage: "Investment proposal created!",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    invest,
  };
}

function getInvestmentsWithType(
  investments: Investment[],
  type: AccountType
): InvestPayload["vaults"] {
  return investments
    .filter((inv) => inv.type === type)
    .map((inv) => [
      inv.vault,
      //NOTE: assumed native, since asset type is not indicated in EndowmentBalance
      { info: { native: "ujunox" }, amount: scaleToStr(inv.amount) },
    ]);
}
