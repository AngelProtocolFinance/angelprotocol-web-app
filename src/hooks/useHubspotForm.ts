import { useEffect, useRef, useState } from "react";

interface HubspotWindow extends Window {
  hbspt?: any;
}

type Error = null | String;

export default function useHubspotForm(formId: String) {
  const isCreatedRef = useRef<Boolean>(false);
  const [error, setError] = useState<Error>(null);
  const [scriptLoading, setScriptLoading] = useState(true);
  const [creating, setCreating] = useState(true);

  useEffect(() => {
    // If cachedScripts array already includes src that means another instance ...
    const script = document.createElement("script");
    script.src = "https://js-eu1.hsforms.net/forms/shell.js";
    script.async = true;

    // Script event listener callbacks for load and error
    function handleScriptLoad() {
      setScriptLoading(false);
      setCreating(true);
      const hubspotWindow: HubspotWindow = window;
      if (hubspotWindow.hbspt && !isCreatedRef.current) {
        console.log("creates new");
        hubspotWindow.hbspt.forms.create({
          region: "eu1",
          portalId: "24900163",
          formId: "6593339e-cc5d-4375-bd06-560a8c88879c",
          target: "#container",
        });
        isCreatedRef.current = true;
        setCreating(false);
      }
    }

    function handleScriptError() {
      setScriptLoading(false);
      setError("Error loading script");
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
    loading: scriptLoading || creating,
    error,
  };
}
