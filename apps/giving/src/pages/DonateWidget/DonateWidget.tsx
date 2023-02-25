import { isPrevDark, setToDarkMode, setToLightMode } from "@giving/helpers";
import { useEffect } from "react";
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
        {(endowment) => (
          <InnerComponent
            id={endowment.id}
            isKYCRequired={endowment.kyc_donors_only}
            name={endowment.name}
          />
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
