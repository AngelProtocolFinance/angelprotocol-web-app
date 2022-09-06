import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Account from "./Account";

export default function Accounts() {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });

  return (
    <>
      <h3 className="mt-4 col-span-2 text-xl font-bold text-zinc-50 my-1 uppercase">
        Balances
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          error: "Failed to get balances",
          loading: "Getting balances",
        }}
        classes={{ container: "mt-4" }}
      >
        {(balance) => (
          <>
            <Account type="liquid" balance={balance.liquid} />
            <Account type="locked" balance={balance.locked} />
          </>
        )}
      </QueryLoader>
    </>
  );
}
