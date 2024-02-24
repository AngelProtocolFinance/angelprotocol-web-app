import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { idParamToNum } from "helpers";
import { useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Content from "./Content";

export default function Donate() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const queryState = useEndowment(numId, [
    "fiscal_sponsored",
    "id",
    "image",
    "kyc_donors_only",
    "logo",
    "name",
    "overview",
    "tagline",
    "card_img",
  ]);

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting nonprofit info..",
        error: "Failed to get nonprofit info",
      }}
      classes={{ container: "justify-self-center text-center mt-8" }}
    >
      {(profile) => (
        <>
          <Seo
            title={`Donate to ${profile.name} - ${APP_NAME}`}
            description={profile.overview.slice(0, 140)}
            name={`${profile.name}`}
            image={`${profile.logo}`}
            url={`${DAPP_URL}/donate/${profile.id}`}
          />
          <Content
            tagline={profile.tagline}
            logo={profile.card_img || profile.logo}
            name={profile.name}
            banner={profile.image}
            id={numId}
          />
        </>
      )}
    </QueryLoader>
  );
}
