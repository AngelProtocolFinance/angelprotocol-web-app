import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { idParamToNum } from "helpers";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import type { DonationIntent } from "types/aws";
import Content from "./Content";

export function Donate() {
  const location = useLocation();

  //setter of this should make sure that intent.endowmentId is the same as this page's param.id.
  const intent = location.state as DonationIntent | undefined;

  //clear window.history.state after loading the intent into memory
  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);

  const queryState = useEndowment({ id: numId });

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
          <Content endowment={profile} intent={intent} />
        </>
      )}
    </QueryLoader>
  );
}
