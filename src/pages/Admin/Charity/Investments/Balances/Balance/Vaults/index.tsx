import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

type Props = {
  classes?: string;
  type: AccountType;
};

export default function Vaults({ classes = "", type }: Props) {
  const { id, details } = useAdminResources<"charity">();
  const queryState = useBalanceQuery({ id });

  const strats = details[type].strats;
  const oneOffs = details[type].one_offs;
  const haveNoInvestments = strats.length <= 0 && oneOffs.length <= 0;

  return (
    <div
      className={`${classes} p-4 bg-zinc-50/5 shadow-innner rounded-sm grid-content-start`}
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
          {(balance) => <Table {...balance} type={type} classes="mt-4" />}
        </QueryLoader>
      )}
    </div>
  );
}
