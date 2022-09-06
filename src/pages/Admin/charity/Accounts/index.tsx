import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import Account from "./Account";

export default function Accounts() {
  const { endowmentId } = useAdminResources();
  const {
    data: balance,
    isLoading,
    isError,
  } = useBalanceQuery({ id: endowmentId });

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
    <>
      <h3 className="mt-4 col-span-2 text-xl font-bold text-zinc-50 my-1 uppercase">
        Balances
      </h3>
      <Account type="liquid" balance={balance.liquid} />
      <Account type="locked" balance={balance.locked} />
    </>
  );
}
