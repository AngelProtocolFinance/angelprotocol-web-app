import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useStateQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import { accountTypeDisplayValue } from "../../constants";
import WithdrawForm from "./WithdrawForm";

type AccTypeDispVal = typeof accountTypeDisplayValue;
type AccTypes = keyof AccTypeDispVal;
type TabEntries = [AccTypes, AccTypeDispVal[AccTypes]][];

const tabEntries = Object.entries(accountTypeDisplayValue) as TabEntries;

export default function Withdrawer() {
  const { state } = useLocation(); //state is set from dashboard withdraw link
  const type = state as AccountType;
  const { id } = useAdminResources();
  const queryState = useStateQuery({ id });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading withdraw form...",
        error: "Failed to load withdraw form",
      }}
    >
      {({ tokens_on_hand }) => (
        <Tab.Group
          as="div"
          className="justify-self-center flex flex-col items-center p-8 gap-6 border border-prim rounded"
          defaultIndex={type === "locked" ? 1 : 0}
        >
          <Tab.List className="grid grid-cols-2 place-items-center gap-1 w-full h-10 p-1 border border-prim rounded-3xl">
            {tabEntries.map(([accType, value]) => (
              <Tab
                key={`tab-list-${accType}`}
                className={({ selected }) =>
                  `${
                    selected
                      ? "bg-orange-l5 dark:bg-blue-d4 border border-prim"
                      : ""
                  } rounded-2xl flex items-center justify-center w-full h-full uppercase text-sm font-bold focus:outline-none`
                }
              >
                {value}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabEntries.map(([accType]) => (
              <Tab.Panel
                key={`tab-panel-${accType}`}
                className="w-full max-w-md"
              >
                <WithdrawForm
                  balance={tokens_on_hand[accType]}
                  type={accType}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </QueryLoader>
  );
}
