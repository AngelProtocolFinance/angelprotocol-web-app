import { useEffect } from "react";
import { isPrevDark, setToDarkMode, setToLightMode } from "helpers";
import ApiKeyChecker from "./ApiKeyChecker";
import EndowmentLoader from "./EndowmentLoader";
import InnerComponent from "./InnerComponent";
import useWidgetParams from "./useWidgetParams";

type Props = { params?: string; className?: string };

const isPrevThemeDark = isPrevDark();

export default function DonateWidget({ className, params }: Props) {
  const widgetParams = useWidgetParams(params);

  /**
   * Need to set the theme to light, but after widget is closed we need to
   * reverse the user selected theme on the main webapp to the previous theme.
   *
   * If params are passed from parent, we can assume the widget is not being loaded directly inside an iframe.
   * In this case, we must use the already existing theme.
   */
  useEffect(() => {
    const shouldSwitch = isPrevThemeDark && !params;

    if (shouldSwitch) {
      setToLightMode();
    }

    return () => {
      shouldSwitch && setToDarkMode();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            params={widgetParams}
            className={className}
          />
        )}
      </EndowmentLoader>
    </ApiKeyChecker>
  );
}
