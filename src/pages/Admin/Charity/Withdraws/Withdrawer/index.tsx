import { useWithdrawDataQuery } from "services/juno/custom";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../../Context";
import Context, { useWithdrawContext } from "./Context";
import Tabs from "./Tabs";

function Withdrawer() {
  const { id, closed, name, closingBeneficiary, endowType } =
    useAdminContext<"charity">();

  const { withdrawEndowSource } = useWithdrawContext();

  const queryState = useWithdrawDataQuery({
    withdrawer: { id, endowType, name },
    //changing sourceEndowId will refetch balances
    sourceEndowId: withdrawEndowSource?.id,
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

export default function WithdrawerWithContext() {
  return (
    <Context>
      <Withdrawer />
    </Context>
  );
}
