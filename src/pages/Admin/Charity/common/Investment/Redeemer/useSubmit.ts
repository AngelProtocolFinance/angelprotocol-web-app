import { FormValues } from "./types";
import { AccountType } from "types/lists";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useTxSender(true);

  async function submit({ token }: FormValues) {
    const account = new Account(wallet);

    const msg = account.createEmbeddedRedeemMsg({
      id,
      acct_type: type,
      vaults: [[vault, scaleToStr(token.amount)]],
    });

    const cw3contract = new CW3(wallet, multisig);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Redeem",
      `redeem funds from: ${vault}`,
      [msg]
    );

    await sendTx({
      content: { type: "cosmos", val: [proposal] },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_redeem"),
    });
  }

  return { submit, isSending };
}
