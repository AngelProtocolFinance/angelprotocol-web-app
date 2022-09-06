import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import useWithdrawer from "../../Withdrawer/useWithdrawer";
import Holdings from "../Holdings";
import Strategies from "../Strategies";

export default function Locked() {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });
  const showWithdraw = useWithdrawer({ cw20: [], native: [] });

  return (
    <div className="grid grid-rows-[auto_1fr_auto] text-white/80">
      <h3 className="mb-2 text-2xl font-extrabold w-full font-bold uppercase">
        Locked Account
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          error: "Failed to get balances",
          loading: "Getting balances",
        }}
      >
        {(balance) => <Holdings balance={balance.locked} />}
      </QueryLoader>
      <Strategies type="locked" />
    </div>
  );
}
