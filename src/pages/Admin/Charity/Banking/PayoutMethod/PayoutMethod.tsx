import { useParams } from "react-router-dom";
import { useAdminContext } from "pages/Admin/Context";
import { useBankingApplicationQuery } from "services/aws/banking-applications";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus } from "components/Status";
import Loaded from "./Loaded";

export default function PayoutMethod() {
  const { id = "" } = useParams();
  const { id: endowID } = useAdminContext();

  const queryState = useBankingApplicationQuery(
    { uuid: id, requestor: "endowment", endowmentID: endowID },
    {
      skip: !id,
    }
  );

  return (
    <div>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing thickness={10} classes="w-32 justify-self-center" />
          ),
          error: (
            <ErrorStatus classes="justify-self-center">
              Failed to load banking details
            </ErrorStatus>
          ),
        }}
      >
        {(data) => <Loaded {...data} />}
      </QueryLoader>
    </div>
  );
}
