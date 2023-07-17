import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus } from "components/Status";

export default function List() {
  const { id } = useAdminContext();
  const queryState = useProfileQuery(id);

  console.log(queryState.data);

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
    <div className="grid gap-3">
      <ContentLoader className="h-12 w-full" />
    </div>
  );
}
