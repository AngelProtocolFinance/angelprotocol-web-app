import { useProfileQuery } from "services/aws/aws";
import CommonSEO from "components/Seo";
import { APP_NAME } from "constants/common";
import { useAdminResources } from "../Guard";

export default function Seo({ title, url }: { title: string; url: string }) {
  const { id } = useAdminResources();
  const { data: profile } = useProfileQuery(id);

  return (
    <CommonSEO
      title={`${title} - ${APP_NAME}`}
      description={(profile?.overview ?? "").slice(0, 140)}
      name={profile?.name}
      image={profile?.logo}
      url={url}
    />
  );
}
