import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { idParamToNum } from "helpers";
import { useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Content from "./Content";

export default function Donate() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const queryState = useEndowment({ id: numId }, [
    "id",
    "image",
    "logo",
    "name",
    "overview",
    "tagline",
    "card_img",
    "hide_bg_tip",
  ]);

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting nonprofit info..",
        error: "Failed to get nonprofit info",
      }}
      classes={{ container: "place-self-center text-center mt-8" }}
    >
      {(profile) => (
        <>
          <Seo
            title={`Donate to ${profile.name} - ${APP_NAME}`}
            description={profile.overview?.slice(0, 140)}
            name={profile.name}
            image={profile.logo}
            url={`${BASE_URL}/donate/${profile.id}`}
          />
          <Content
            tagline={profile.tagline}
            logo={profile.card_img || profile.logo || ""}
            name={profile.name}
            hide_bg_tip={!!profile.hide_bg_tip}
            banner={profile.image || ""}
            id={numId}
          />
        </>
      )}
    </QueryLoader>
  );
}
