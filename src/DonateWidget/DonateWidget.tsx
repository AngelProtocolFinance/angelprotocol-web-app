import { useEffect } from "react";
import { UrlParamValues } from "./types";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";
import ApiKeyChecker from "./ApiKeyChecker";
import EndowmentLoader from "./EndowmentLoader";
import InnerComponent from "./InnerComponent";
import useWidgetParams from "./useWidgetParams";

const isPrevThemeDark = isPrevDark();

type Props = { params?: UrlParamValues };

export default function DonateWidget(props: Props) {
  const urlParams = useWidgetParams({ skip: !!props.params });

  const params: UrlParamValues = !!props.params ? props.params : urlParams!;

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
            params={params}
          />
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
