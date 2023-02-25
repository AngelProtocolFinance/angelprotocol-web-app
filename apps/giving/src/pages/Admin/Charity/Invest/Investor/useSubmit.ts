import { useGetWallet } from "@giving/contexts/wallet-context";
import Account from "@giving/contracts/Account";
import CW3 from "@giving/contracts/CW3";
import { scaleToStr } from "@giving/helpers";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender";
import { getTagPayloads } from "@giving/services/juno/getTagPayloads";
import { FormValues } from "./types";
import { AccountType } from "@giving/types/contracts";
import { ProposalMeta } from "@giving/types/pages/admin";
import { useAdminResources } from "pages/Admin/Guard";

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
    const meta: ProposalMeta = { type: "acc_invest" };
    const proposal = cw3contract.createProposalMsg(
      "Invest",
      `Invest funds to: ${vault}`,
      [msg],
      JSON.stringify(meta)
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_invest"),
    });
  }

  return { submit, isSending };
}
