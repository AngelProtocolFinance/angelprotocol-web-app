import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { DonateData } from "api/donate-loader";
import { ErrorStatus } from "components/status";
import { useEffect } from "react";
import Content from "./content";
import parseConfig from "./parse-config";

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
