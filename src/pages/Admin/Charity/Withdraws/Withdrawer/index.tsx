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
      className="justify-self-center flex flex-col items-center p-8 gap-6 border border-prim rounded"
      defaultIndex={type === "locked" ? 1 : 0}
    >
      <Tab.List className="grid grid-cols-2 place-items-center gap-1 w-full h-10 p-1 border border-prim rounded-3xl">
        {tabs.map((t) => (
          <Tab
            key={`tab-list-${t}`}
            className={({ selected }) =>
              `${
                selected
                  ? "bg-orange-l5 dark:bg-blue-d4 border border-prim"
                  : ""
              } rounded-2xl flex items-center justify-center w-full h-full uppercase text-sm font-bold focus:outline-none`
            }
          >
            {accountTypeDisplayValue[t]}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="w-full max-w-md border rounded border-prim">
        {tabs.map((t) => (
          <Tab.Panel key={`tab-panel-${t}`}>
            <WithdrawForm balance={tokens_on_hand[t]} type={t} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
