import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Account from "./Account";

export default function Accounts() {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        error: "Failed to get balances",
        loading: "Getting balances",
      }}
      classes={{ container: "mt-4" }}
    >
      {(balance) => (
        <div className="grid gap-x-3 content-start justify-center">
          <Account type="liquid" balance={balance.liquid} />
          <Account type="locked" balance={balance.locked} />
        </div>
      )}
    </QueryLoader>
  );
}
