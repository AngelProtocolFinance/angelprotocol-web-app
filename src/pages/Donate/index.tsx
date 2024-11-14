import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { idParamToNum } from "helpers";
import { useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Content from "./Content";

export function Component() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);

  const queryState = useEndowment(numId);

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
            description={profile.tagline?.slice(0, 140)}
            name={profile.name}
            image={profile.logo}
            url={`${BASE_URL}/donate/${profile.id}`}
          />
          <Content endowment={profile} />
        </>
      )}
    </QueryLoader>
  );
}
