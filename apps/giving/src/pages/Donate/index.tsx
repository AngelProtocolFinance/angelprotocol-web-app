import banner from "@/assets/images/hero.png";
import { QueryLoader, Seo } from "@ap/components";
import { idParamToNum } from "@ap/helpers";
import { useProfileQuery } from "@ap/services/aws";
import { useParams } from "react-router-dom";
import Content from "./Content";

export default function Donate() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const queryState = useProfileQuery(numId, { skip: numId === 0 });

  return (
    <section className="grid content-start w-full font-work min-h-screen sm:min-h-[900px] pb-20">
      <div
        style={{
          backgroundImage: `url('${queryState.data?.image || banner}')`,
        }}
        className="relative overlay w-full object-cover h-72 bg-center bg-cover"
      />
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting endowment info..",
          error: "Failed to get endowment info",
        }}
        classes={{ container: "justify-self-center text-center mt-8" }}
      >
        {(profile) => (
          <>
            <Seo
              title={`Donate to ${profile.name} - Angel Giving`}
              description={`${profile.overview.slice(0, 140)}`}
              name={`${profile.name}`}
              image={`${profile.logo}`}
              url={`https://app.angel.giving/donate/${profile.id}`}
            />
            <Content
              name={profile.name}
              id={numId}
              isKYCRequired={profile.kyc_donors_only}
            />
          </>
        )}
      </QueryLoader>
    </section>
  );
}
