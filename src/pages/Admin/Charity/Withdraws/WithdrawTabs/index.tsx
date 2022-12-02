import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { AccountType, EndowmentBalance } from "types/contracts";
import Transactor from "components/Transactor";
import { accountTypeDisplayValue } from "../../constants";
import Withdrawer from "./Withdrawer";

const tabs: AccountType[] = ["liquid", "locked"];
export default function WithdrawTabs({ tokens_on_hand }: EndowmentBalance) {
  const { state } = useLocation(); //state is set from dashboard withdraw link
  const type = state as AccountType;
  return (
    <Tab.Group
      as="div"
      className="mt-6 justify-self-center"
      defaultIndex={type === "locked" ? 1 : 0}
    >
      <Tab.List className="grid grid-cols-2 rounded mb-1 overflow-hidden border border-gray-l2 dark:border-bluegray p-0.5">
        {tabs.map((t) => (
          <Tab
            key={t}
            className={({ selected }) =>
              `${
                selected
                  ? "bg-blue-l1 dark:bg-blue-d2 text-white"
                  : "bg-white dark:bg-blue-d6"
              } rounded px-4 py-2 uppercase text-sm font-bold focus:outline-none`
            }
          >
            {accountTypeDisplayValue[t]}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="w-full max-w-md border rounded border-gray-l2 dark:border-bluegray">
        {tabs.map((t) => (
          <Tab.Panel key={t}>
            <Transactor
              Content={Withdrawer}
              contentProps={{ balance: tokens_on_hand[t], type: t }}
              inModal={false}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
