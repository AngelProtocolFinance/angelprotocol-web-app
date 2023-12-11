import { useAdminContext } from "pages/Admin/Context";
import { usePayoutMethodsQuery } from "services/aws/banking-applications";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function List() {
  const { id } = useAdminContext();
  const queryState = usePayoutMethodsQuery({
    requestor: "endowment",
    endowmentID: id,
  });

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-left text-lg">Payout methods</h1>
        <button className="btn-green pl-2 pr-4 py-2 text-xs">
          <Icon type="Plus" className="mr-2" size={16} />
          <span>New</span>
        </button>
      </div>

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
