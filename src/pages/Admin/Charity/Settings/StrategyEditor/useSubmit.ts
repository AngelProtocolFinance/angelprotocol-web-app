import { FormValues } from "./types";
import { ProposalMeta } from "pages/Admin/types";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(type: AccountType) {
  const { cw3, id, propMeta, getWallet } = useAdminResources();
  const sendTx = useCosmosTxSender();

  async function submit(data: FormValues) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

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
