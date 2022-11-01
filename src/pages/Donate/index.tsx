import { useParams } from "react-router-dom";
import { DonateParams } from "./types";
import { useEndowmentDetailsQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { idParamToNum } from "helpers";
import Steps from "./Steps";

export default function Donate() {
  const { id } = useParams<DonateParams>();
  const numId = idParamToNum(id);
  const queryState = useEndowmentDetailsQuery(
    { id: numId },
    { skip: numId === 0 }
  );

  return (
    <section className="grid content-start min-h-screen w-full font-work bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white pb-20">
      <div className="w-full bg-market-banner-light dark:bg-market-banner-dark h-72 bg-center bg-cover pt-24" />
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting endowment info..",
          error: "Failed to get endowment info",
        }}
        classes={{ container: "text-center mt-8" }}
      >
        {(endowment) => (
          <Steps
            name={endowment.name}
            id={numId}
            isKYCRequired={endowment.kyc_donors_only}
          />
        )}
      </QueryLoader>
    </section>
  );
}
