import { useEndowBalanceQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import { hasElapsed } from "helpers/admin";
import { useAdminContext } from "../../../Context";
import Tabs from "./Tabs";
import WithdrawForm from "./WithdrawForm";

const container = "dark:bg-blue-d6 border border-prim rounded max-w-lg  p-8";

export default function Withdrawer() {
  const { id, endowType, maturityTime } = useAdminContext<"charity">();
  const queryState = useEndowBalanceQuery({ id });

  const isLockAvailable =
    endowType === "charity" ||
    (endowType === "normal" && hasElapsed(maturityTime));

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading withdraw form...",
        error: "Failed to load withdraw form",
      }}
    >
      {(balances) =>
        isLockAvailable ? (
          <Tabs balances={balances} classes={container} />
        ) : (
          <WithdrawForm
            type="liquid"
            balances={balances["liquid"]}
            classes={container}
          />
        )
      }
    </QueryLoader>
  );
}
