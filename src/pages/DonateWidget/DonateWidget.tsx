import { useEffect } from "react";
import Seo from "components/Seo";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";
import { APP_NAME, DAPP_DOMAIN } from "constants/common";
import { PAYMENT_WORDS, titleCase } from "constants/env";
import ApiKeyChecker from "./ApiKeyChecker";
import EndowmentLoader from "./EndowmentLoader";
import InnerComponent from "./InnerComponent";

const isPrevThemeDark = isPrevDark();

export default function DonateWidget() {
  /**
   * Need to set the theme to light, but after widget is closed we need to
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

  /** Hide the Intercom chatbot */
  useEffect(() => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("update", { hide_default_launcher: true });
      w.Intercom("hide");
    }
  }, []);

  return (
    <ApiKeyChecker>
      <EndowmentLoader>
        {(p) => (
          <>
            <Seo
              title={`${titleCase(PAYMENT_WORDS.verb)} to ${
                p.name
              } - ${APP_NAME}`}
              description={(p.overview ?? "").slice(0, 140)}
              name={p.name}
              image={`${p.logo}`}
              url={`${DAPP_DOMAIN}/donate_widget/${p.id}`}
            />
            <InnerComponent
              id={p.id}
              isKYCRequired={p.kyc_donors_only ?? false}
              name={p.name}
              skipKycStep={
                p.type === "ast" && !p.contributor_verification_required
              }
            />
          </>
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
