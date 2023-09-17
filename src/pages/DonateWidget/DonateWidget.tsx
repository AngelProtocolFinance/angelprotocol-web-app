import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { idParamToNum, setToLightMode } from "helpers";
import { LOGO_DARK } from "constants/common";
import Content from "./Content";

//light mode by default
setToLightMode();

export default function DonateWidget() {
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const endowId = idParamToNum(routeParams.id);
  const queryState = useProfileQuery({ endowId }, { skip: endowId === 0 });

  /** Hide the Intercom chatbot */
  useEffect(() => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("update", { hide_default_launcher: true });
      w.Intercom("hide");
    }
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] justify-items-center gap-10">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing thickness={12} classes="w-28 place-self-center" />
          ),
          error: "Failed to get endowment info",
        }}
        classes={{ container: "grid place-items-center h-full w-full" }}
      >
        {(profile) => <Content profile={profile} searchParams={searchParams} />}
      </QueryLoader>{" "}
      <footer className="grid place-items-center h-20 w-full bg-blue dark:bg-blue-d3">
        <Image className="w-20" {...LOGO_DARK} />
      </footer>
    </div>
  );
}
