import { ErrorStatus } from "components/status";
import { BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types";
import Content from "./content";
import parseConfig from "./parse-config";

export { ErrorBoundary } from "components/error";
export { loader } from "api/donate-loader";

export const meta: Route.MetaFunction = ({ loaderData: d, location: l }) => {
  if (!d) return [];
  const { endow } = d;
  return metas({
    title: `Donate to ${endow.name}`,
    description: endow.tagline?.slice(0, 140),
    name: endow.name,
    image: endow.image || endow.logo,
    url: `${BASE_URL}/${l.pathname}`,
  });
};

export default function Page({ loaderData }: Route.ComponentProps) {
  const { endow, program, user } = loaderData;
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
      <Content
        npo={endow}
        user={user}
        program={
          program
            ? {
                id: program.id.toString(),
                name: program.title,
              }
            : undefined
        }
        config={config}
      />
    </div>
  );
}
