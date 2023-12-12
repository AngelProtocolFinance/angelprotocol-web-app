import { useAdminContext } from "pages/Admin/Context";
import { usePayoutMethodsQuery } from "services/aws/banking-applications";
import ContentLoader from "components/ContentLoader";
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
        <button
          disabled={queryState.isLoading}
          className="btn-green pl-2 pr-4 py-2 text-xs"
        >
          <Icon type="Plus" className="mr-2" size={16} />
          <span>New</span>
        </button>
      </div>

      <QueryLoader
        queryState={queryState}
        messages={{
          loading: <Skeleton />,
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

function Skeleton() {
  return (
    <div className="grid gap-y-1 mt-2">
      <ContentLoader className="h-12 w-full rounded" />
      <ContentLoader className="h-12 w-full rounded" />
      <ContentLoader className="h-12 w-full rounded" />
      <ContentLoader className="h-12 w-full rounded" />
    </div>
  );
}
