import { getTagPayloads } from "@giving/helpers/admin";
import { FormValues } from "./types";
import { AccountType } from "@giving/types/contracts";
import { ProposalMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";

export default function useSubmit(type: AccountType) {
  const { cw3, id, propMeta } = useAdminResources();

  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
  async function submit(data: FormValues) {
    const account = new Account(wallet);
    const msg = account.createEmbeddedStrategyUpdateMsg({
      id,
      acct_type: type,
      strategies: data.allocations.map((alloc) => ({
        percentage: `${alloc.percentage / 100}`,
        vault: alloc.vault,
      })),
    });
    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const meta: ProposalMeta = { type: "acc_strategy" };
    const proposal = cw3contract.createProposalMsg(
      "Update strategy",
      `update stratey of endowment: ${id}`,
      [msg],
      JSON.stringify(meta)
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_strategy"),
    });
  }

  return {
    submit,
  };
}
