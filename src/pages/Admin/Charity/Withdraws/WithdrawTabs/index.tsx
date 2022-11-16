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
      <Tab.List className="grid grid-cols-2 rounded-md mb-1 overflow-hidden">
        {tabs.map((t) => (
          <Tab
            key={t}
            className={({ selected }) =>
              `${
                selected
                  ? "bg-angel-blue text-zinc-50"
                  : "bg-zinc-50/80 text-angel-grey"
              } px-4 py-2 uppercase text-sm disabled:text-zinc-400`
            }
          >
            {accountTypeDisplayValue[t]}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="w-full max-w-md">
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
