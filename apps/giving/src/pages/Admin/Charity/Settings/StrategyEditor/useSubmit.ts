import { useAdminResources } from "@giving/contexts/admin";
import { useGetWallet } from "@giving/contexts/wallet-context";
import Account from "@giving/contracts/Account";
import CW3 from "@giving/contracts/CW3";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender";
import { getTagPayloads } from "@giving/services/juno/getTagPayloads";
import { FormValues } from "./types";
import { AccountType } from "@giving/types/contracts";
import { ProposalMeta } from "@giving/types/pages/admin";

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
