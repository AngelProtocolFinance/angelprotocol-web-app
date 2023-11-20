import { useParams } from "react-router-dom";
import { useApplicationQuery } from "services/aws/aws";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus } from "components/Status";
import Loaded from "./Loaded";

export default function Application() {
  const { id = "" } = useParams();
  const queryState = useApplicationQuery(id, { skip: !id });

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-center text-3xl max-lg:font-work col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: <LoaderRing thickness={10} classes="w-32" />,
          error: <ErrorStatus>Failed to load application details</ErrorStatus>,
        }}
      >
        {(data) => <Loaded {...data} />}
      </QueryLoader>
    </div>
  );
}
