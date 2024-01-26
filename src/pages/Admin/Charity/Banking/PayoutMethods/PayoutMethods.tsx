import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "pages/Admin/Context";
import { Link } from "react-router-dom";
import { usePayoutMethodsQuery } from "services/aws/banking-applications";
import Table from "./Table";

export default function PayoutMethods() {
  const { id } = useAdminContext();
  const queryState = usePayoutMethodsQuery(id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-left text-lg uppercase">Current Banking Details</h1>
        <Link
          to="new"
          aria-disabled={queryState.isLoading}
          className="btn-green pl-2 pr-4 py-2 text-xs"
        >
          <Icon type="Plus" className="mr-2" size={16} />
          <span>New</span>
        </Link>
      </div>

      <QueryLoader
        queryState={queryState}
        classes={{ container: "mt-4 border-t pt-4 border-prim" }}
        messages={{
          loading: <Skeleton />,
          error: "Failed to get payout methods",
          empty: "No payout methods found.",
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
