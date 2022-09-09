import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { AccountType, EndowmentBalance } from "types/contracts";
import Transactor from "components/Transactor";
import Withdrawer from "./Withdrawer";

const tabs: AccountType[] = ["liquid", "locked"];
export default function WithdrawTabs({ tokens_on_hand }: EndowmentBalance) {
  return (
    <Tab.Group as="div" className="mt-6 justify-self-center">
      <Tab.List className="grid grid-cols-2 rounded-md mb-1 overflow-hidden">
        {tabs.map((t) => (
          <Tab
            key={t}
            className={({ selected }) =>
              `${
                selected
                  ? "bg-angel-blue text-zinc-50"
                  : "bg-zinc-50/80 text-angel-grey"
              } px-4 py-2 uppercase text-sm`
            }
          >
            {t}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((t) => (
          <Tab.Panel key={t} as={Fragment}>
            <Transactor
              Content={Withdrawer}
              contentProps={{ balance: tokens_on_hand[t], type: t }}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
