import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";

type Props = {
  classes?: string;
  type: AccountType;
};

export default function Vaults({ classes = "", type }: Props) {
  const { endowmentId, endowment } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });

  const strats = endowment.strategies[type];
  const oneOffs = endowment.oneoff_vaults[type];
  const haveNoInvestments = strats.length <= 0 && oneOffs.length <= 0;

  return (
    <div
      className={`${classes} p-4 border border-zinc-50/10 grid-content-start`}
    >
      <h3 className="uppercase font-semibold text-center">Invested vaults</h3>
      {haveNoInvestments ? (
        <p className="mt-1 text-center">
          <Icon
            type="Info"
            className="inline-block relative bottom-0.5 mr-0.5"
          />
          <span>No investments found</span>
        </p>
      ) : (
        <QueryLoader
          queryState={queryState}
          classes={{ container: "justify-center" }}
          messages={{ loading: "", error: "Failed to get vault balances" }}
        >
          {(balance) => <>vaults with balance</>}
        </QueryLoader>
      )}
    </div>
  );
}
