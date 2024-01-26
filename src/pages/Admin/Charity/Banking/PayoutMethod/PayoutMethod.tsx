import QueryLoader from "components/QueryLoader";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { useAdminContext } from "pages/Admin/Context";
import { useParams } from "react-router-dom";
import { useBankingApplicationQuery } from "services/aws/banking-applications";
import Loaded from "./Loaded";

export default function PayoutMethod() {
  const { id = "" } = useParams();
  const { id: endowID } = useAdminContext();

  const queryState = useBankingApplicationQuery(
    { uuid: id, requestor: "endowment", endowmentID: endowID },
    {
      skip: !id,
    },
  );

  return (
    <div>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoadingStatus classes="justify-self-center">
              Loading bank details..
            </LoadingStatus>
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
