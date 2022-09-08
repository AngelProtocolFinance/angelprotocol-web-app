import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Icon from "components/Icon";
import { maskAddress, roundDown } from "helpers";
import Pie, { UNALLOCATED_COLOR, pieColors } from "../Pie";
import { routes } from "../routes";

export default function Allocation(props: { type: AccountType }) {
  const { endowment } = useAdminResources();
  const strats = endowment.strategies[props.type];

  function renderVaults() {
    const total = strats.reduce((total, s) => total + +s.percentage, 0);
    const vaults = strats.map((s, i) => (
      <Slice
        key={s.vault}
        pct={+s.percentage * 100}
        name={maskAddress(s.vault)}
        color={pieColors[i].bg}
      />
    ));

    const idxAfterLastStrat = strats.length;
    if (total < 1) {
      vaults.push(
        <Slice
          key={idxAfterLastStrat}
          pct={(1 - total) * 100}
          name="Investable assets"
          color={UNALLOCATED_COLOR.bg}
        />
      );
    }
    return vaults;
  }

  return (
    <Tab.Panel className="grid grid-cols-[auto_1fr] items-center gap-x-4 p-4">
      <Link
        to={`../${routes.edit_allocations}/${props.type}`}
        className="col-span-2 justify-self-end flex items-center gap-1 text-zinc-50/80 uppercase font-heading text-sm hover:text-angel-orange"
      >
        <Icon type="Edit" />
        <span>Edit</span>
      </Link>
      <Pie
        series={strats.map((s) => +s.percentage)}
        max={1}
        classes="w-[15rem]"
      />
      <div className="justify-self-start grid gap-y-2">{renderVaults()}</div>
    </Tab.Panel>
  );
}

type Props = {
  name: string;
  pct: number;
  color: string;
};

function Slice({ name, pct, color }: Props) {
  return (
    <div className="flex items-center gap-2 text-zinc-50/80">
      <div className={`w-6 h-6 rounded-full ${color}`}></div>
      <span className="text-sm font-mono">{roundDown(pct)}%</span>
      <span className="">{name}</span>
    </div>
  );
}
