import { FormValues, Investment } from "./types";
import { AccountType, EmbeddedWasmMsg, InvestPayload } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { scaleToStr } from "helpers";
import { junoDenom } from "constants/tokens";

export default function useInvest() {
  const { cw3, id, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();

  async function invest(data: FormValues) {
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
          id,
          acct_type: "liquid",
          vaults: getInvestmentsWithType(data.investments, "liquid"),
        })
      );
    }

    if (lockedInvestments.length > 0) {
      msgs.push(
        account.createEmbeddedInvestMsg({
          id,
          acct_type: "locked",
          vaults: getInvestmentsWithType(data.investments, "locked"),
        })
      );
    }

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Invest",
      `Redeem funds for endowment: ${id}`,
      msgs
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
    });
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
      { info: { native: junoDenom }, amount: scaleToStr(inv.amount) },
    ]);
}
