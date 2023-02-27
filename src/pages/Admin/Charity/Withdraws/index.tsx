import { useAdminResources } from "pages/Admin/Guard";
import { useStateQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import Transactions from "./Transactions";
import WithdrawForm from "./WithdrawForm";

export default function Withdraws() {
  const { id } = useAdminResources();
  const queryState = useStateQuery({ id });

  return (
    <div className="grid gap-6">
      <h2 className="text-center font-bold text-3xl">Withdraw</h2>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading withdraw form...",
          error: "Failed to load withdraw form",
        }}
      >
        {(balance) => <WithdrawForm {...balance} />}
      </QueryLoader>

      <h3 className="uppercase font-extrabold text-2xl mt-6 border-t border-prim pt-2">
        Transactions
      </h3>
      <Transactions />
    </div>
  );
}
