import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawInfoQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import Transactions from "./Transactions";
import WithdrawTabs from "./WithdrawTabs";

export default function Withdraws() {
  const { endowmentId } = useAdminResources();
  const queryState = useWithdrawInfoQuery({ id: endowmentId });

  return (
    <div className="grid content-start font-work">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading withdraw form...",
          error: "Failed to load withdraw form",
        }}
      >
        {(state) => <WithdrawTabs {...state} />}
      </QueryLoader>

      <h3 className="uppercase font-extrabold text-2xl mt-6 border-t border-prim pt-2">
        Transactions
      </h3>
      <Transactions />
    </div>
  );
}
