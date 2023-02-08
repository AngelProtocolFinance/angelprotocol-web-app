import { useParams } from "react-router-dom";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import QueryLoader from "components/QueryLoader";
import Container from "../Container";

export default function AIF() {
  const { id } = useParams<{ id: string }>();
  const { wallet } = useGetWallet();

  const queryState = useAdminResourcesQuery(
    {
      user: wallet?.address,
      endowmentId: id!,
    },
    { skip: !id }
  );

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        error: "Error fetching profile",
        loading: "Loading profile",
      }}
    >
      {(endowmentProfile) => (
        <InnerComponent adminResources={endowmentProfile} />
      )}
    </QueryLoader>
  );
}

function InnerComponent({
  adminResources,
}: {
  adminResources: AdminResources;
}) {
  return (
    <Container adminResources={adminResources}>
      <div className="min-h-[50vh]">AIF</div>
    </Container>
  );
}
