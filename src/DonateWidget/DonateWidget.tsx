// import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEndowInfoQuery } from "services/juno/custom";
import { QueryLoader } from "components/admin";
import {
  idParamToNum,
  isPrevDark,
  setToDarkMode,
  setToLightMode,
} from "helpers";
import ApiKeyChecker from "./ApiKeyChecker";
import Content from "./Content";

const isPrevThemeDark = isPrevDark();

export default function DonateWidget() {
  const { id } = useParams<{ id: string }>();
  const endowId = idParamToNum(id);
  const queryState = useEndowInfoQuery(endowId, { skip: endowId === 0 });

  /**
   * need to set the theme to light, but after widget is closed we need to
   * reverse the user selected theme on the main webapp to the previous theme
   */
  useEffect(() => {
    if (isPrevThemeDark) {
      setToLightMode();
    }

    return () => {
      isPrevThemeDark && setToDarkMode();
    };
  }, []);

  useEffect(() => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("update", { hide_default_launcher: true });
      w.Intercom("hide");
    }
  }, []);

  return (
    <ApiKeyChecker>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting endowment info..",
          error: "Failed to get endowment info",
        }}
        classes={{ container: "text-center mt-8" }}
      >
        {(endowment) => (
          <Content
            id={endowment.id}
            isKYCRequired={endowment.kyc_donors_only}
            name={endowment.name}
          />
        )}
      </QueryLoader>
    </ApiKeyChecker>
  );
}
