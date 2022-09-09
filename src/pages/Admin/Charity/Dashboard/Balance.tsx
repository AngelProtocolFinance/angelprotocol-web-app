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
    <div>
      <h4 className="uppercase text-zinc-50/80">{type}</h4>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching balances",
          error: "Failed to get balances",
        }}
      >
        {(balances) => <Holdings {...balances.tokens_on_hand[type]} />}
      </QueryLoader>
    </div>
  );
}
