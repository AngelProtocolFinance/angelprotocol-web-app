import { Tab } from "@headlessui/react";
import { AccountType, EndowmentType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useContractQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import WithdrawForm from "./WithdrawForm";

const types: { [key in EndowmentType]: AccountType[] } = {
  charity: ["liquid", "locked"],
  normal: ["liquid"],
};

export default function Withdrawer() {
  const { id, endow_type } = useAdminResources<"charity">();
  const queryState = useContractQuery("accounts.state", { id });

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
          className="flex flex-col items-center max-w-lg p-8 gap-6 dark:bg-blue-d6 border border-prim rounded"
        >
          {endow_type === "charity" && (
            <Tab.List className="grid grid-cols-2 place-items-center gap-1 w-full h-10 p-1 border border-prim rounded-3xl">
              {types[endow_type].map((type) => (
                <Tab
                  key={`tab-${type}`}
                  className="rounded-2xl flex items-center justify-center w-full h-full uppercase text-sm font-bold focus:outline-none aria-selected:bg-orange-l5 aria-selected:dark:bg-blue-d4 aria-selected:border aria-selected:border-prim"
                >
                  {type}
                </Tab>
              ))}
            </Tab.List>
          )}
          <Tab.Panels>
            {types[endow_type].map((type) => (
              <Tab.Panel key={`tab-panel-${type}`}>
                <WithdrawForm type={type} balance={tokens_on_hand[type]} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </QueryLoader>
  );
}
