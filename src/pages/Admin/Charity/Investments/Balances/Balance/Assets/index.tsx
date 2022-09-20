import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import Holdings from "./Holdings";

type Props = {
  classes?: string;
  type: AccountType;
};

export default function Assets({ classes = "", type }: Props) {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });
  return (
    <div className={`${classes} p-4 bg-zinc-50/5 shadow-inner rounded-sm`}>
      <h3 className="uppercase font-semibold text-center">Investable assets</h3>
      <QueryLoader
        queryState={queryState}
        classes={{ container: "justify-center mt-4" }}
        messages={{
          loading: "Fetching balances",
          error: "Failed to get balances",
        }}
      >
        {(balance) => (
          <Holdings
            {...balance.tokens_on_hand[type]}
            type={type}
            classes="mt-4"
          />
        )}
      </QueryLoader>
    </div>
  );
}
