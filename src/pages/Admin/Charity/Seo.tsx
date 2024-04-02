import CommonSEO from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { useEndowment } from "services/aws/useEndowment";
import { useAdminContext } from "../Context";

export default function Seo({
  title,
  url = "",
}: {
  title: string;
  url?: string;
}) {
  const { id } = useAdminContext();
  const { data: profile } = useEndowment({ id }, ["logo", "name", "overview"]);

  return (
    <CommonSEO
      title={`${title} - ${APP_NAME}`}
      description={profile?.overview.slice(0, 140)}
      name={profile?.name}
      image={profile?.logo}
      url={`${DAPP_URL}/${appRoutes.admin}/${id}/${url}`}
    />
  );
}
