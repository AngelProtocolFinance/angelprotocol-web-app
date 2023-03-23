import { useAdminResources } from "pages/Admin/Guard";
import useQueryContract from "services/contract/useQueryContract";
import SWRLoader from "components/SWRLoader";
import AccountTabs from "../../common/AccountTabs";
import WithdrawForm from "./WithdrawForm";

export default function Withdrawer() {
  const { id } = useAdminResources();
  const queryState = useQueryContract("accounts", "accState", { id });

  return (
    <SWRLoader
      queryState={queryState}
      messages={{
        loading: "Loading withdraw form...",
        error: "Failed to load withdraw form",
      }}
    >
      {({ tokens_on_hand }) => (
        <AccountTabs
          classes={{
            container:
              "flex flex-col items-center max-w-lg p-8 gap-6 dark:bg-blue-d6 border border-prim rounded",
            tabs: "grid grid-cols-2 place-items-center gap-1 w-full h-10 p-1 border border-prim rounded-3xl",
            tab: "rounded-2xl flex items-center justify-center w-full h-full uppercase text-sm font-bold focus:outline-none aria-selected:bg-orange-l5 aria-selected:dark:bg-blue-d4 aria-selected:border aria-selected:border-prim",
          }}
        >
          <WithdrawForm type="liquid" balance={tokens_on_hand["liquid"]} />
          <WithdrawForm type="locked" balance={tokens_on_hand["locked"]} />
        </AccountTabs>
      )}
    </SWRLoader>
  );
}
