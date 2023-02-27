import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { AccountType, EndowmentState } from "types/contracts";
import { accountTypeDisplayValue } from "../../constants";
import WithdrawForm from "./WithdrawForm";

const tabs: AccountType[] = ["liquid", "locked"];
export default function Withdrawer({ tokens_on_hand }: EndowmentState) {
  const { state } = useLocation(); //state is set from dashboard withdraw link
  const type = state as AccountType;
  return (
    <Tab.Group
      as="div"
      className="mt-6 justify-self-center"
      defaultIndex={type === "locked" ? 1 : 0}
    >
      <Tab.List className="grid grid-cols-2 rounded mb-1 overflow-hidden border border-prim p-0.5">
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
      <Tab.Panels className="w-full max-w-md border rounded border-prim">
        {tabs.map((t) => (
          <Tab.Panel key={t}>
            <WithdrawForm balance={tokens_on_hand[t]} type={t} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
