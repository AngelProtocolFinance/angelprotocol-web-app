import { fill } from "components/donate-methods";
import { Configurer } from "./configurer";
import { Preview } from "./preview";
import { Snippet } from "./snippet";

import { to_form_target } from "components/goal-selector";
import { metas } from "helpers/seo";
import { useFetcher } from "react-router";
import type { Route } from "./+types";

export { loader } from "./api";
export { ErrorBoundary } from "components/error";
export const meta: Route.MetaFunction = ({ loaderData: d, location: loc }) => {
  if (!d) return [];
  return metas({ title: `Form - ${d.name}` });
};

export default function Page({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { back_url, base_url, ...d } = loaderData;

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
          is_submitting={fetcher.state === "submitting"}
          increments={d.increments ?? []}
          target={to_form_target(d.target ? d.target.toString() : "0")}
          methods={fill(d.donate_methods)}
          accent_primary={d.accent_primary}
          accent_secondary={d.accent_secondary}
          on_submit={(x) => fetcher.submit(x, { method: "POST" })}
        />
        <Snippet src={`${base_url}/forms/${d.id}`} classes="mt-10" />
      </div>

      <Preview
        {...loaderData}
        classes="order-last @4xl/widget:order-none @4xl/widget:mt-0 mt-10"
      />
    </div>
  );
}
