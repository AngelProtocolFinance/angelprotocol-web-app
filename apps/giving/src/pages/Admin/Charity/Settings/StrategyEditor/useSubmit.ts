import { useAdminResources } from "@ap/contexts/admin";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { Account, CW3 } from "@ap/contracts";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { getTagPayloads } from "@ap/services/juno";
import { FormValues } from "./types";
import { ProposalMeta } from "@ap/types/admin";
import { AccountType } from "@ap/types/contracts";

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
