import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import Holdings from "../Holdings";
import { accountTypeDisplayValue } from "../constants";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });

  return (
    <div className="rounded p-3 border border-gray-l2 dark:border-bluegray bg-orange-l6 dark:bg-blue-d6">
      <h4 className="uppercase font-extrabold">
        {accountTypeDisplayValue[type]}
      </h4>
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
