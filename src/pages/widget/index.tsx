import { fill } from "components/donate-methods";
import { DEFAULT_PROGRAM } from "components/donation";
import { DONATION_INCREMENTS } from "constants/common";
import { useState } from "react";
import type { IWidgetFv } from "types/widget";
import { Configurer } from "./configurer";
import { Preview } from "./preview";
import { Snippet } from "./snippet";

import { BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import { bg_accent_primary, bg_accent_secondary } from "styles/colors";
import type { Route } from "./+types";

export { loader } from "./api";
export { ErrorBoundary } from "components/error";
export const meta: Route.MetaFunction = ({ loaderData: d, location: loc }) => {
  if (!d) return [];
  return metas({
    title: `Donation Form Configuration${d.endow?.id ? ` for nonprofit ${d.endow?.id}` : ""}`,
    description: d.endow?.tagline?.slice(0, 140),
    name: d.endow?.name,
    image: d.endow?.logo,
    url: `${BASE_URL}${loc.pathname}`,
  });
};

export default function Widget({ loaderData }: Route.ComponentProps) {
  const { endow, base_url, endows } = loaderData;

  const [fv, set_fv] = useState<IWidgetFv>({
    is_description_text_shown: true,
    is_title_shown: true,
    methods: fill(endow?.donateMethods),
    accent_primary: bg_accent_primary,
    accent_secondary: bg_accent_secondary,
    program: DEFAULT_PROGRAM,
    increments: DONATION_INCREMENTS.map((i) => ({
      label: i.label,
      value: i.value.toString(),
    })),
  });

  return (
    <div className="grid px-6 py-4 @4xl:px-10 @4xl:py-8 @4xl:grid-cols-2 @4xl:gap-x-10 w-full h-full group @container/widget">
      <h1 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3 @4xl/widget:col-span-2">
        Accept donations from your website today!
      </h1>
      <p className="mb-8 text-center @4xl/widget:text-left text-sm @4xl/widget:text-base @4xl/widget:col-span-2 pb-2">
        Just configure your Donation Form below, copy & paste the code on your
        website and you're ready to go!
      </p>
      <div className="w-full">
        <Configurer
          fv={{ ...fv, methods: fill(fv.methods.map((x) => x.id)) }}
          set_fv={set_fv}
          endow={endow}
          endows={endows}
        />
        <Snippet base_url={base_url} fv={fv} classes="mt-10" endow={endow} />
      </div>

      <Preview
        endow={endow}
        fv={fv}
        classes="order-last @4xl/widget:order-none @4xl/widget:mt-0 mt-10"
      />
    </div>
  );
}
