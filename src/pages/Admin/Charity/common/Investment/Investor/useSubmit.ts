import { FormValues } from "./types";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(vault: string, type: AccountType) {
  const { cw3, id, propMeta, getWallet } = useAdminResources();
  const { sendTx, isSending } = useCosmosTxSender(true);

  async function submit({ token }: FormValues) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

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
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_invest"),
    });
  }

  return { submit, isSending };
}
