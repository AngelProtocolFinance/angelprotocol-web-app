import { useWithdrawInfoQuery } from "services/juno/custom";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../../Context";
import Tabs from "./Tabs";

export default function Withdrawer() {
  const { id } = useAdminContext<"charity">();
  const queryState = useWithdrawInfoQuery({ id });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: <ContentLoader className="w-full max-w-lg h-80" />,
        error: "Failed to load withdraw form",
      }}
    >
      {({ fees, balances }) => <Tabs balances={balances} fees={fees} />}
    </QueryLoader>
  );
}
