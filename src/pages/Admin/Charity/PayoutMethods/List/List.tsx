import { useAdminContext } from "pages/Admin/Context";
import { usePayoutMethodsQuery } from "services/aws/banking-applications";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function List() {
  const { id } = useAdminContext();
  const queryState = usePayoutMethodsQuery({
    requestor: "endowment",
    endowmentID: id,
  });

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-center text-3xl max-lg:font-work col-span-full max-lg:mb-4">
        Payout methods
      </h1>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading payout methods...",
          error: "Failed to get applications",
          empty: "No applications found.",
        }}
      >
        {(methods) => (
          <div className="grid col-span-full overflow-x-auto">
            <Table methods={methods} />
          </div>
        )}
      </QueryLoader>
    </div>
  );
}
