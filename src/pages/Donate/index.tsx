import { useParams } from "react-router-dom";
import banner from "assets/images/hero.png";
import { useEndowInfoQuery } from "services/aws/aws";
import Seo from "components/Seo";
import { QueryLoader } from "components/admin";
import { idParamToNum } from "helpers";
import Steps from "./Steps";

export default function Donate() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const queryState = useEndowInfoQuery(numId, { skip: numId === 0 });

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
        classes={{ container: "text-center mt-8" }}
      >
        {(endowment) => (
          <>
            <Seo
              title={`Donate to ${endowment.name} - Angel Protocol`}
              description={`${endowment.overview.slice(0, 140)}`}
              name={`${endowment.name}`}
              image={`${endowment.logo}`}
              url={`https://app.angelprotocol.io/donate/${endowment.id}`}
            />
            <Steps
              name={endowment.name}
              id={numId}
              isKYCRequired={endowment.kyc_donors_only}
            />
          </>
        )}
      </QueryLoader>
    </section>
  );
}
