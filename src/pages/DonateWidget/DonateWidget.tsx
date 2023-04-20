import { useEffect } from "react";
import { endow } from "services/types";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";
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
          <InnerComponent
            id={p.id}
            isKYCRequired={endow(p) && p.kyc_donors_only}
            name={p.name}
          />
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
