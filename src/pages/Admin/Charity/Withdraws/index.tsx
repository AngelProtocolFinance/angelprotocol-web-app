import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Transactions from "./Transactions";
import WithdrawTabs from "./WithdrawTabs";

export default function Withdraws() {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });

  return (
    <div className="grid content-start text-white">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading withdraw form...",
          error: "Failed to load withdraw form",
        }}
      >
        {(balance) => <WithdrawTabs {...balance} />}
      </QueryLoader>

      <h3 className="uppercase font-extrabold text-2xl mt-6 border-t border-white/20 pt-2">
        Transactions
      </h3>
      <Transactions />
    </div>
  );
}
