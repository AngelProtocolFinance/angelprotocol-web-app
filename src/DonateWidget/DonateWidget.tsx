import { useEffect } from "react";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";
import ApiKeyChecker from "./ApiKeyChecker";
import Content from "./Content";
import EndowmentLoader from "./EndowmentLoader";

const isPrevThemeDark = isPrevDark();

export default function DonateWidget() {
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
      <EndowmentLoader>
        {(endowment) => (
          <Content
            id={endowment.id}
            isKYCRequired={endowment.kyc_donors_only}
            name={endowment.name}
          />
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
