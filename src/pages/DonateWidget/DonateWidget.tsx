import { ErrorStatus } from "components/Status";
import { useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Content from "./Content";
import parseConfig from "./parseConfig";

import type { DonateData } from "api/donate-loader";
export { loader } from "api/donate-loader";

export default function DonateWidget() {
  const { endow } = useLoaderData() as DonateData;
  const [searchParams] = useSearchParams();

  /** Hide the Intercom chatbot */
  useEffect(() => {
    const w = window as any;
    if ("Intercom" in w) {
      w.Intercom("update", { hide_default_launcher: true });
      w.Intercom("hide");
    }
  }, []);

  const config = parseConfig(searchParams);

  //validation error
  if ("error" in config) {
    return <ErrorStatus classes="h-full">{config.error}</ErrorStatus>;
  }

  const { accentPrimary, accentSecondary } = config;

  return (
    <div
      style={{
        ...(accentPrimary
          ? ({ "--accent-primary": accentPrimary } as any)
          : {}),
        ...(accentPrimary
          ? ({ "--accent-secondary": accentSecondary } as any)
          : {}),
      }}
      className="grid grid-rows-[1fr_auto] justify-items-center gap-10"
    >
      <Content profile={endow} config={config} />
    </div>
  );
}
