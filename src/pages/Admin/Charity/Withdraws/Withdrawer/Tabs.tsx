import { Tab } from "@headlessui/react";
import { AccountType, BalanceInfo } from "types/contracts";
import WithdrawForm from "./WithdrawForm";

const _tabs: AccountType[] = ["liquid", "locked"];

export default function Tabs({
  classes = "",
  ...balances
}: BalanceInfo & { classes?: string }) {
  return (
    <Tab.Group
      as="div"
      className={`flex flex-col items-center ${classes} gap-6`}
    >
      <Tab.List className="grid grid-cols-2 place-items-center gap-1 w-full h-10 p-1 border border-prim rounded-3xl">
        {_tabs.map((type) => (
          <Tab
            key={`tab-${type}`}
            className="rounded-2xl flex items-center justify-center w-full h-full uppercase text-sm font-bold focus:outline-none aria-selected:bg-orange-l5 aria-selected:dark:bg-blue-d4 aria-selected:border aria-selected:border-prim"
          >
            {type}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        {_tabs.map((type) => (
          <Tab.Panel key={`tab-panel-${type}`}>
            <WithdrawForm type={type} balance={balances[type]} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
