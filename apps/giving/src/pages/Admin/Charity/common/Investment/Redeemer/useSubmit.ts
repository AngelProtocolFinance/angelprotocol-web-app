import { useAdminResources } from "@ap/contexts/admin";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { Account, CW3 } from "@ap/contracts";
import { scaleToStr } from "@ap/helpers";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { getTagPayloads } from "@ap/services/juno";
import { FormValues } from "./types";
import { AccountType } from "@ap/types/contracts";

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
