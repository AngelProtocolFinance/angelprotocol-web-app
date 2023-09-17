import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import QueryLoader from "components/QueryLoader";
import { idParamToNum } from "helpers";
import LoadedPage from "./LoadedPage";
import { styles } from "./constants";

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
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting endowment info..",
        error: "Failed to get endowment info",
      }}
      classes={{ container: styles.page }}
    >
      {(profile) => (
        <LoadedPage profile={profile} searchParams={searchParams} />
      )}
    </QueryLoader>
  );
}
