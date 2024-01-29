import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus, Info } from "components/Status";
import { useAdminContext } from "pages/Admin/Context";
import { useEndowment } from "services/aws/useEndowment";
import { Program } from "./Program";

export default function List() {
  const { id } = useAdminContext();
  const queryState = useEndowment(id, ["program"]);

  return (
    <QueryLoader
      queryState={{ ...queryState, data: queryState.data?.program || [] }}
      messages={{
        loading: <Skeleton />,
        error: <ErrorStatus>Failed to load programs</ErrorStatus>,
        empty: <Info>No programs found</Info>,
      }}
    >
      {(programs) => (
        <div className="@container grid gap-3 p-4 @lg:p-8 border border-prim rounded bg-white dark:bg-blue-d6">
          {programs.map((p) => (
            <Program {...p} key={p.program_id} />
          ))}
        </div>
      )}
    </QueryLoader>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-3 p-8 mt-8 border border-prim">
      <ContentLoader className="h-24 w-full rounded" />
      <ContentLoader className="h-24 w-full rounded" />
      <ContentLoader className="h-24 w-full rounded" />
    </div>
  );
}
