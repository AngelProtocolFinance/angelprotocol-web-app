import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { ErrorStatus } from "components/Status";
import withAuth from "contexts/Auth";
import { useParams } from "react-router-dom";
import { useApplicationQuery } from "services/aws/aws";
import Loaded from "./Loaded";

function Application() {
  const { id = "" } = useParams();
  const queryState = useApplicationQuery(id, { skip: !id });

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <Seo title="Application review" />
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing thickness={10} classes="w-32 justify-self-center" />
          ),
          error: (
            <ErrorStatus classes="justify-self-center">
              Failed to load application details
            </ErrorStatus>
          ),
        }}
      >
        {(data) => <Loaded {...data} />}
      </QueryLoader>
    </div>
  );
}

export const Component = withAuth(Application, ["ap-admin"]);
