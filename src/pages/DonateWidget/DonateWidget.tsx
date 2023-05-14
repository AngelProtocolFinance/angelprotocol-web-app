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
        {(profile) => (
          <>
            <Seo
              title={`${titleCase(PAYMENT_WORDS.verb)} to ${
                profile.name
              } - ${APP_NAME}`}
              description={(profile.overview ?? "").slice(0, 140)}
              name={profile.name}
              image={`${profile.logo}`}
              url={`${DAPP_DOMAIN}/donate_widget/${profile.id}`}
            />
            <InnerComponent
              id={profile.id}
              isKYCRequired={profile.kyc_donors_only ?? false}
              name={profile.name}
              skipKycStep={
                profile.type === "ast" &&
                !profile.contributor_verification_required
              }
            />
          </>
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
