import { Program as TProgram } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus, Info } from "components/Status";

export default function List() {
  const { id } = useAdminContext();
  const queryState = useProfileQuery(id);

  return (
    <QueryLoader
      queryState={{ ...queryState, data: queryState.data?.program || [] }}
      messages={{
        loading: <Skeleton />,
        error: (
          <ErrorStatus classes="mt-8">Failed to load programs</ErrorStatus>
        ),
        empty: <Info classes="mt-8">No programs found</Info>,
      }}
    >
      {(programs) => (
        <div className="grid gap-3 p-8 mt-8 border border-prim rounded bg-white dark:bg-blue-d6">
          {programs.map((p) => (
            <Program {...p} key={p.program_id} />
          ))}
        </div>
      )}
    </QueryLoader>
  );
}

function Program(props: TProgram) {
  return (
    <div className="p-6 border border-prim rounded bg-gray-l6 dark:bg-blue-d5 flex items-center gap-x-4">
      <Image
        src={props.program_banner}
        alt="program banner"
        className="w-10 aspect-square object-cover"
      />
      <p className="font-bold">{props.program_title}</p>
      <button className="btn-outline-filled w-24 py-2 ml-auto" type="button">
        delete
      </button>
      <button className="btn-outline-filled w-24 py-2" type="button">
        edit
      </button>
    </div>
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
