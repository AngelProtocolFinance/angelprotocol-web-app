import { useWithdrawInfoQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import { hasElapsed } from "helpers/admin";
import { useAdminResources } from "../../../Context";
import Tabs from "./Tabs";
import WithdrawForm from "./WithdrawForm";

const container = "dark:bg-blue-d6 border border-prim rounded max-w-lg  p-8";

export default function Withdrawer() {
  const { id, endowType, maturityTime } = useAdminResources<"charity">();
  const queryState = useWithdrawInfoQuery({ id });

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
      {({ fees, balances }) =>
        isLockAvailable ? (
          <Tabs balances={balances} classes={container} fees={fees} />
        ) : (
          <WithdrawForm
            type="liquid"
            balances={balances["liquid"]}
            classes={container}
            fees={fees}
          />
        )
      }
    </QueryLoader>
  );
}
