import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus } from "components/Status";
import withAuth from "contexts/Auth";
import { useParams } from "react-router-dom";
import { useBankingApplicationQuery } from "services/aws/banking-applications";
import Loaded from "./Loaded";

function BankingApplication() {
  const { id = "" } = useParams();

  const queryState = useBankingApplicationQuery(
    { uuid: id, requestor: "bg-admin" },
    {
      skip: !id,
    }
  );

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing thickness={10} classes="w-32 justify-self-center" />
          ),
          error: (
            <ErrorStatus classes="justify-self-center">
              Failed to load banking application
            </ErrorStatus>
          ),
        }}
      >
        {(data) => <Loaded {...data} />}
      </QueryLoader>
    </div>
  );
}

export default withAuth(BankingApplication);
