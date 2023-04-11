import { useEndowBalanceQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import { isMatured } from "helpers/admin";
import { useAdminResources } from "../../../Guard";
import Tabs from "./Tabs";
import WithdrawForm from "./WithdrawForm";

const container = "dark:bg-blue-d6 border border-prim rounded max-w-lg  p-8";

export default function Withdrawer() {
  const { id, endow_type, maturityTime } = useAdminResources<"charity">();
  const queryState = useEndowBalanceQuery({ id });

  const isLockAvailable =
    endow_type === "charity" ||
    (endow_type === "normal" && isMatured(maturityTime));

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading withdraw form...",
        error: "Failed to load withdraw form",
      }}
    >
      {(balance) =>
        isLockAvailable ? (
          <Tabs {...balance} classes={container} />
        ) : (
          <WithdrawForm
            type="liquid"
            balance={balance["liquid"]}
            classes={container}
          />
        )
      }
    </QueryLoader>
  );
}
