import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Holdings from "../Holdings";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });

  return (
    <div className="shadow-inner bg-white/5 rounded-md p-3 text-white/80">
      <h4 className="uppercase font-extrabold">{type}</h4>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching balances",
          error: "Failed to get balances",
        }}
      >
        {(balance) => (
          <Holdings {...balance.tokens_on_hand[type]} type={type} />
        )}
      </QueryLoader>
    </div>
  );
}
