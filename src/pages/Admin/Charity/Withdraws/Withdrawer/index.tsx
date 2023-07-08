import { useWithdrawInfoQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../../Context";
import Tabs from "./Tabs";

const container = "dark:bg-blue-d6 border border-prim rounded max-w-lg p-8";

export default function Withdrawer() {
  const { id } = useAdminContext<"charity">();
  const queryState = useWithdrawInfoQuery({ id });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading withdraw form...",
        error: "Failed to load withdraw form",
      }}
    >
      {({ fees, balances }) => (
        <Tabs balances={balances} classes={container} fees={fees} />
      )}
    </QueryLoader>
  );
}
