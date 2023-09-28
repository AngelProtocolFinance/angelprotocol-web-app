import { useWithdrawDataQuery } from "services/juno/custom";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../../Context";
import Tabs from "./Tabs";

export default function Withdrawer() {
  const { id, closed, name, closingBeneficiary, endowType } =
    useAdminContext<"charity">();

  const queryState = useWithdrawDataQuery({
    withdrawer: { id, endowType, name },
  });

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: <ContentLoader className="w-full max-w-lg h-80" />,
        error: "Failed to load withdraw form",
      }}
    >
      {({ bridgeFees, balances, protocolFeeRates }) => (
        <Tabs
          endowmentState={{ closed, closingBeneficiary }}
          balances={balances}
          bridgeFees={bridgeFees}
          protocolFeeRates={protocolFeeRates}
        />
      )}
    </QueryLoader>
  );
}
