import { Tab } from "@headlessui/react";
import { EndowBalance } from "services/types";
import { BridgeFees } from "types/aws";
import { AccountType } from "types/lists";
import WithdrawForm from "./WithdrawForm";

const _tabs: AccountType[] = ["liquid", "locked"];

type Props = {
  classes?: string;
  balances: EndowBalance;
  bridgeFees: BridgeFees;
};

export default function Tabs({ classes = "", balances, bridgeFees }: Props) {
  return (
    <Tab.Group
      as="div"
      className={`flex flex-col items-center ${classes} gap-6 dark:bg-blue-d6 border border-prim rounded max-w-lg p-8`}
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
        {_tabs.map((accountType) => (
          <Tab.Panel key={accountType}>
            <WithdrawForm
              accountType={accountType}
              balances={balances[accountType]}
              bridgeFees={bridgeFees}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
