import { useEffect, useRef, useState } from "react";

interface HubspotWindow extends Window {
  hbspt?: any;
}

type Error = null | String;
const scriptURL = "https://js-eu1.hsforms.net/forms/shell.js";
const portalId = "24900163";
const formId = "d87f00e4-6501-46f7-bc0d-cc518ff3654a";

export default function useHBSTCreator() {
  const isCreatedRef = useRef<Boolean>(false);
  const [error, setError] = useState<Error>(null);
  const [scriptLoading, setScriptLoading] = useState(true);
  const [creating, setCreating] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = scriptURL;
    script.async = true;

    // Script event listener callbacks for load and error
    function handleScriptLoad() {
      setScriptLoading(false);
      setCreating(true);
      const hubspotWindow: HubspotWindow = window;
      if (hubspotWindow.hbspt && !isCreatedRef.current) {
        hubspotWindow.hbspt.forms.create({
          region: "eu1",
          target: "#hbst",
          portalId,
          formId,
        });
        isCreatedRef.current = true;
      }
      setCreating(false);
    }

    function handleScriptError() {
      setScriptLoading(false);
      //Script loading may fail if internet connection is interrupted
      setError("Error loading contact form");
    }

    script.addEventListener("load", handleScriptLoad);
    script.addEventListener("error", handleScriptError);

    // Add script to document body
    document.body.appendChild(script);

    // Remove event listeners on cleanup
    return () => {
      script.removeEventListener("load", handleScriptLoad);
      script.removeEventListener("error", handleScriptError);
    };
  }, []);

  return {
    isLoading: scriptLoading || creating,
    error,
  };
}
