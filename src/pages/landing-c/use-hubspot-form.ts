import { useEffect, useState } from "react";

type State = "loading" | "loaded" | "error";

export function useHubspotForm() {
  const [state, setState] = useState<State | undefined>();

  //biome-ignore lint: no deps
  useEffect(() => {
    function load() {
      if (state === "loading" || state === "loaded") return;
      setState("loading");
      const script = document.createElement("script");
      script.src = "https://js-eu1.hsforms.net/forms/embed/24900163.js";
      script.defer = true;

      script.onload = () => {
        setState("loaded");
      };

      script.onerror = () => {
        setState("error");
      };

      document.body.appendChild(script);
    }
    load();
  }, []);

  return { state };
}
