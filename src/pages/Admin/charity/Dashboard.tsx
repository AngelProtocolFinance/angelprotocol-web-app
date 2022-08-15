import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { useAdminResources } from "../Guard";
import Account from "./Account";
import Transactions from "./Transactions";

export default function Dashboard() {
  const { endowment } = useAdminResources();
  const { data: balance, isLoading, isError } = useBalanceQuery(endowment);

  if (isLoading) {
    return (
      <p className="mt-6 flex gap-2 text-zinc-50/90">
        <Icon
          type="Loading"
          size={20}
          className="animate-spin relative top-1"
        />
        <span className="text-lg">Getting account info..</span>
      </p>
    );
  }

  if (isError || !balance) {
    return (
      <p className="mt-6 flex gap-2 text-rose-200">
        <Icon type="Warning" size={20} className="relative top-1" />
        <span className="text-lg">Failed to get account info</span>
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 content-start justify-center">
      <h3 className="mt-4 col-span-2 text-xl font-bold text-zinc-50 my-1 uppercase">
        Balances
      </h3>
      <Account type="liquid" balance={balance.liquid_balance} />
      <Account type="locked" balance={balance.locked_balance} />

      <h3 className="mt-8 col-span-2 text-xl font-bold text-zinc-50 my-1 uppercase">
        Strategies
      </h3>
      <div className="grid place-items-center col-span-2 h-60 bg-zinc-50/10 rounded-md shadow-inner">
        <p className="text-lg text-zinc-100">Coming soon!</p>
      </div>

      <Transactions endowmentAddress={endowment} />
    </div>
  );
}
