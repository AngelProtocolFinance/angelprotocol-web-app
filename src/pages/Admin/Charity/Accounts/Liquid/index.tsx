import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import useWithdrawer from "../../Withdrawer/useWithdrawer";
import Holdings from "../Holdings";
import Strategies from "../Strategies";

export default function Liquid(props: { classes?: string }) {
  const { endowmentId } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });
  const showWithdraw = useWithdrawer({ cw20: [], native: [] });

  return (
    <div className={`grid content-start text-white/80 ${props.classes ?? ""}`}>
      <div className="mb-2 flex items-center justify-self-start">
        <h3 className="text-2xl w-full font-extrabold uppercase">
          Liquid Account
        </h3>
      </div>
      <QueryLoader
        queryState={queryState}
        messages={{
          error: "Failed to get balances",
          loading: "Getting balances",
        }}
      >
        {(balance) => (
          <>
            <button
              onClick={showWithdraw}
              className="ml-auto bg-angel-blue hover:bg-bright-blue disabled:bg-grey-accent px-2 py-1 rounded-md uppercase text-sm font-heading"
            >
              withdraw
            </button>
            <Holdings balance={balance.liquid} />
          </>
        )}
      </QueryLoader>
      <Strategies type="liquid" />
    </div>
  );
}
