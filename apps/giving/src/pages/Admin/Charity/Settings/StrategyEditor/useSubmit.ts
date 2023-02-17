import Account from "@/contracts/Account";
import CW3 from "@/contracts/CW3";
import useCosmosTxSender from "@/hooks/useCosmosTxSender";
import { useAdminResources } from "@/pages/Admin/Guard";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { FormValues } from "./types";
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
    const proposal = cw3contract.createProposalMsg(
      "Update strategy",
      `update stratey of endowment: ${id}`,
      [msg]
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
    });
  }

  return {
    submit,
  };
}
