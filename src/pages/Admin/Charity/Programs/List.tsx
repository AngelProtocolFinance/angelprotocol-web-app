import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus } from "components/Status";

export default function List() {
  const { id } = useAdminContext();
  const queryState = useProfileQuery(id);

  queryState.isLoading = true;

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: <Skeleton />,
        error: <ErrorStatus>Failed to load programs</ErrorStatus>,
      }}
    >
      {() => <></>}
    </QueryLoader>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-3 p-8 mt-4 border border-prim">
      <ContentLoader className="h-24 w-full rounded" />
      <ContentLoader className="h-24 w-full rounded" />
      <ContentLoader className="h-24 w-full rounded" />
    </div>
  );
}
