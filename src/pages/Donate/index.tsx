import { useParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { idParamToNum } from "helpers";
import { APP_NAME, DAPP_URL } from "constants/env";
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
  ]);

  return (
    <section className="grid content-start w-full font-work min-h-screen sm:min-h-[900px] pb-20 bg-orange-l6">
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
              name={profile.name}
              id={numId}
              isKYCRequired={profile.kyc_donors_only ?? false}
              isFiscalSponsored={profile.fiscal_sponsored ?? false}
            />
          </>
        )}
      </QueryLoader>
    </section>
  );
}
