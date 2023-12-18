import { useParams } from "react-router-dom";
import { useApplicationQuery } from "services/aws/aws";
import withAuth from "contexts/Auth";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { ErrorStatus } from "components/Status";
import { groups } from "constants/auth";
import Loaded from "./Loaded";

export default withAuth(function BankingApplication({ user }) {
  const { id = "" } = useParams();

  const isAuthorized =
    user.groups.includes(groups["ap-admin"]) || user.endowments.includes(+id);

  const queryState = useApplicationQuery(id, {
    skip: !id || !isAuthorized,
  });

  if (!isAuthorized) {
    return (
      <div className="grid content-start place-items-center py-20">
        <Icon type="ExclamationCircleFill" size={80} className="text-red" />
        <p className="text-xl mt-8 font-work ">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
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
});
