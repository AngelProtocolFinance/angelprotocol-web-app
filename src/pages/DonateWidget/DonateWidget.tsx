import { DappLogo } from "components/Image";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { DonationTermsAndConditions } from "components/donation";
import { idParamToNum, setToLightMode } from "helpers";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Content from "./Content";

//light mode by default
setToLightMode();

export default function DonateWidget() {
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const endowId = idParamToNum(routeParams.id);
  const queryState = useEndowment({ id: endowId });

  /** Hide the Intercom chatbot */
  useEffect(() => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("update", { hide_default_launcher: true });
      w.Intercom("hide");
    }
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] justify-items-center gap-10 @container">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing thickness={12} classes="w-28 place-self-center" />
          ),
          error: "Failed to get nonprofit info",
        }}
        classes={{ container: "grid place-items-center h-full w-full" }}
      >
        {(profile) => <Content profile={profile} searchParams={searchParams} />}
      </QueryLoader>
      <DonationTermsAndConditions
        endowName={queryState.data?.name ?? "this nonprofit"}
        classes="border-t @3xl:border-none border-gray-l3 px-4 pt-4"
      />
      <footer className="grid place-items-center h-20 w-full bg-blue dark:bg-blue-d3">
        <DappLogo classes="w-40" color="white" />
      </footer>
    </div>
  );
}
