import { DappLogo } from "components/Image";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { ErrorStatus } from "components/Status";
import { APP_NAME, BASE_URL } from "constants/env";
import { idParamToNum, setToLightMode } from "helpers";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import Content from "./Content";
import parseConfig from "./parseConfig";

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

  const config = parseConfig(searchParams);

  //validation error
  if ("error" in config) {
    return <ErrorStatus classes="h-full">{config.error}</ErrorStatus>;
  }

  const { accentPrimary, accentSecondary } = config;

  return (
    <div
      style={{
        ...(accentPrimary
          ? ({ "--accent-primary": accentPrimary } as any)
          : {}),
        ...(accentPrimary
          ? ({ "--accent-secondary": accentSecondary } as any)
          : {}),
      }}
      className="grid grid-rows-[1fr_auto] justify-items-center gap-10"
    >
      <Seo scripts={[]} />
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: (
            <LoaderRing
              thickness={12}
              classes={{
                container: "w-28 place-self-center",
                ringToColor: "to-[--accent-primary]",
              }}
            />
          ),
          error: "Failed to get nonprofit info",
        }}
        classes={{ container: "grid place-items-center h-full w-full" }}
      >
        {(profile) => <Content profile={profile} config={config} />}
      </QueryLoader>
      <footer className="grid place-items-center h-20 w-full bg-[--accent-primary]">
        <DappLogo
          classes="w-40"
          color="white"
          to={{ href: BASE_URL, title: `Go to ${APP_NAME}` }}
        />
      </footer>
    </div>
  );
}
