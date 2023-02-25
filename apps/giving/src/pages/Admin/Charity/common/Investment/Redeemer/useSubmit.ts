import { useGetWallet } from "@giving/contexts/wallet-context";
import Account from "@giving/contracts/Account";
import CW3 from "@giving/contracts/CW3";
import { scaleToStr } from "@giving/helpers";
import { getTagPayloads } from "@giving/helpers/admin";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender";
import { FormValues } from "./types";
import { AccountType } from "@giving/types/contracts";
import { useAdminResources } from "pages/Admin/Guard";

export default function useSubmit(vault: string, type: AccountType) {
  const { cw3, id, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useCosmosTxSender(true);

  async function submit({ token }: FormValues) {
    const account = new Account(wallet);

    const msg = account.createEmbeddedRedeemMsg({
      id,
      acct_type: type,
      vaults: [[vault, scaleToStr(token.amount)]],
    });

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Redeem",
      `redeem funds from: ${vault}`,
      [msg]
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_redeem"),
    });
  }

  return { submit, isSending };
}
