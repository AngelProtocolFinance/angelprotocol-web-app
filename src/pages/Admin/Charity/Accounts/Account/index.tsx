import { Tab } from "@headlessui/react";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import useWithdrawer from "../../Withdrawer/useWithdrawer";
import Customs from "./Customs";
import Holdings from "./Holdings";
import Strategies from "./Strategies";

type Props = {
  classes?: string;
  type: AccountType;
};

export default function Account({ classes = "", type }: Props) {
  const { endowmentId, endowment } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });
  const showWithdraw = useWithdrawer();
  const strats = endowment.strategies[type];

  return (
    <Tab.Panel className="grid grid-cols-2">
      <div className={`grid content-start text-white/80 ${classes} pb-3`}>
        <h3 className="text-2xl font-extrabold text-zinc-50/80 uppercase mb-4">
          Investable assets
        </h3>
        <QueryLoader
          queryState={queryState}
          messages={{
            error: "Failed to get assets",
            loading: "Getting balances",
          }}
        >
          {(balance) =>
            balance[type].cw20.length <= 0 &&
            balance[type].native.length <= 0 ? (
              <p>No investable assets</p>
            ) : (
              <>
                <Holdings {...balance[type]} />
                <button
                  onClick={() =>
                    showWithdraw({
                      balance: balance[type],
                      type,
                    })
                  }
                  className="mt-6 justify-self-start bg-angel-blue hover:bg-bright-blue disabled:bg-grey-accent px-2 py-1 rounded-md uppercase text-sm font-heading"
                >
                  withdraw
                </button>
              </>
            )
          }
        </QueryLoader>
      </div>
      <Customs strats={[]} type={type} />
      <Strategies strats={strats} type={type} />
    </Tab.Panel>
  );
}
