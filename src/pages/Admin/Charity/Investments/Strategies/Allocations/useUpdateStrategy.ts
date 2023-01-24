import { StrategyFormValues } from "./types";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";

export default function useUpdateStrategy(type: AccountType) {
  const { cw3, endowmentId, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
  async function proposeStrategyUpdate(data: StrategyFormValues) {
    const account = new Account(wallet);
    const msg = account.createEmbeddedStrategyUpdateMsg({
      id: endowmentId,
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
      `update stratey of endowment: ${endowmentId}`,
      [msg]
    );

    await sendTx({
      msgs: [proposal],
      ...propMeta,
    });
  }

  return {
    proposeStrategyUpdate,
  };
}
