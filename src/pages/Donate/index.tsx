import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { idParamToNum } from "helpers";
import { useLocation, useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import type { DonationIntent } from "types/aws";
import Content from "./Content";

export default function Donate() {
  const location = useLocation();
  //setter of this should make sure that intent.endowmentId is the same as this page's param.id
  const intent = location.state as DonationIntent | undefined;

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
      {(endow) => (
        <>
          <Seo
            title={`Donate to ${endow.name} - ${APP_NAME}`}
            description={endow.overview?.slice(0, 140)}
            name={endow.name}
            image={endow.logo}
            url={`${BASE_URL}/donate/${endow.id}`}
          />
          <Content
            recipient={{
              name: endow.name,
              id: numId,
              hide_bg_tip: endow.hide_bg_tip,
            }}
            tagline={endow.tagline}
            logo={endow.card_img || endow.logo || ""}
            banner={endow.image || ""}
            intent={intent}
          />
        </>
      )}
    </QueryLoader>
  );
}
