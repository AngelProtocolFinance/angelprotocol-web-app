import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AccountType, Strategy } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { maskAddress } from "helpers";
import useWithdrawer from "../../Withdrawer/useWithdrawer";
import { routes } from "../../routes";
import Holdings from "./Holdings";

export default function Account(props: {
  classes?: string;
  type: AccountType;
}) {
  const { endowmentId, endowment } = useAdminResources();
  const queryState = useBalanceQuery({ id: endowmentId });
  const showWithdraw = useWithdrawer();
  const strats = endowment.strategies[props.type];

  return (
    <Tab.Panel className="grid grid-cols-2">
      <div
        className={`grid content-start text-white/80 p-3 ${
          props.classes ?? ""
        }`}
      >
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
            balance[props.type].cw20.length <= 0 &&
            balance[props.type].native.length <= 0 ? (
              <p>No investable assets</p>
            ) : (
              <>
                <Holdings balance={balance[props.type]} />
                <button
                  onClick={() => showWithdraw(balance[props.type])}
                  className="mt-6 justify-self-start bg-angel-blue hover:bg-bright-blue disabled:bg-grey-accent px-2 py-1 rounded-md uppercase text-sm font-heading"
                >
                  withdraw
                </button>
              </>
            )
          }
        </QueryLoader>
      </div>
      <div
        className={`grid content-start text-white/80 p-3 border-l border-zinc-50/30 ${
          props.classes ?? ""
        }`}
      >
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-2xl font-extrabold text-zinc-50/80 uppercase ">
            Investments
          </h3>
          <Link
            to={`${routes.investments}/${props.type}`}
            className="uppercase text-xs text-emerald-300"
          >
            + add investment
          </Link>
        </div>
        {(strats.length > 0 && (
          <div className="grid grid-cols-[auto_1fr] content-start items-center gap-x-4">
            <div>
              {strats.map((strategy) => (
                <Investment {...strategy} />
              ))}
            </div>
          </div>
        )) || <p>No investments found</p>}
      </div>
    </Tab.Panel>
  );
}

function Investment({ vault }: Strategy) {
  return (
    <div
      key={vault}
      className="text-zinc-700 bg-zinc-50 rounded-md p-3 aspect-square "
    >
      <div className="flex items-center gap-2">
        <Icon type="Safe" size={25} />
        <span className="font-mono text-sm">{maskAddress(vault)}</span>
      </div>
    </div>
  );
}
