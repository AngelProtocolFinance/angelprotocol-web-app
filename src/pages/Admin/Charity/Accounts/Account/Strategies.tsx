import { Link } from "react-router-dom";
import { AccountType, Strategy } from "types/contracts";
import { roundDown } from "helpers";
import Pie, { UNALLOCATED_COLOR, pieColors } from "../../Pie";
import { routes } from "../../routes";
import Vault from "./Vault";

type Props = {
  strats: Strategy[];
  type: AccountType;
};

export default function Strategies({ strats, type }: Props) {
  function renderVaults() {
    const total = strats.reduce((total, s) => total + +s.percentage, 0);
    const vaults = strats.map((s, i) => (
      <Vault
        key={s.vault}
        {...s}
        pct={+s.percentage * 100}
        color={pieColors[i].bg}
      />
    ));

    const idxAfterLastStrat = strats.length;
    if (total < 1) {
      vaults.push(
        <div
          key={idxAfterLastStrat}
          className="grid grid-rows-[auto_1fr] w-48 text-zinc-700 bg-zinc-50 rounded-md p-3 aspect-square"
        >
          <div className="flex items-center gap-2 justify-between mb-2">
            <div
              className={`${UNALLOCATED_COLOR.bg} w-6 h-6 rounded-full border border-zinc-600/10`}
            />
            <span className="font-bold">
              {roundDown((1 - total) * 100, 2)}%
            </span>
          </div>
          <p className="self-center mb-4 text-center font-bold text-emerald-500">
            Investable assets
          </p>
        </div>
      );
    }
    return vaults;
  }

  return (
    <div
      className={`pt-3 grid content-start text-white/80 col-span-2 border-t border-zinc-50/30`}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-extrabold text-zinc-50/80 uppercase ">
          AUTO-INVESTMENTS
        </h3>
        <Link
          to={`${routes.edit_allocations}/${type}`}
          className="uppercase text-xs text-emerald-300"
        >
          edit strategies
        </Link>
      </div>
      <p className="mb-6 font-heading text-zinc-50/70">
        {strats.length <= 0
          ? `All of incoming donations into your ${type} account goes to investable assets`
          : `Incoming donations into your ${type} account is allocated to the
        following vaults with remaning allocations going to your investable assets.`}
      </p>
      <div className="grid grid-cols-[auto_1fr] place-items-center gap-x-4">
        <div className="flex gap-2">{renderVaults()}</div>
        {strats.length > 0 && (
          <Pie
            series={strats.map((s) => +s.percentage)}
            max={1}
            classes="w-56"
          />
        )}
      </div>
    </div>
  );
}
