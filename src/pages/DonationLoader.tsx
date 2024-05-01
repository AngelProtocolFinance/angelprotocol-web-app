import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { Navigate, useParams } from "react-router-dom";
import { useIntentQuery } from "services/apes";

export default function DonationLoader() {
  const { id } = useParams<{ id: string }>();
  const queryState = useIntentQuery({ transactionId: id ?? "" }, { skip: !id });

  return (
    <QueryLoader queryState={queryState}>
      {({ endowmentId }) => (
        <Navigate
          to={`${appRoutes.donate}/${endowmentId}`}
          state={{ transactionId: id }}
          replace
        />
      )}
    </QueryLoader>
  );
}
