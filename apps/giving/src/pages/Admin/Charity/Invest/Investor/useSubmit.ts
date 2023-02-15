import { FormValues } from "./types";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { scaleToStr } from "helpers";

export default function useSubmit(vault: string, type: AccountType) {
  const { cw3, id, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useCosmosTxSender(true);

  async function submit({ token }: FormValues) {
    const account = new Account(wallet);

    const msg = account.createEmbeddedInvestMsg({
      id,
      acct_type: type,
      vaults: [
        [
          vault,
          {
            info: { native: token.token_id },
            amount: scaleToStr(token.amount),
          },
        ],
      ],
    });

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Invest",
      `Invest funds to: ${vault}`,
      [msg]
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
    });
  }

  return { submit, isSending };
}
