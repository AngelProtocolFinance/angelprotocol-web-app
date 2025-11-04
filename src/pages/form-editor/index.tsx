import { fill } from "components/donate-methods";
import { Configurer } from "./configurer";
import { Preview } from "./preview";
import { Snippet } from "./snippet";

import { to_form_target } from "components/goal-selector";
import { Target } from "components/target";
import { metas } from "helpers/seo";
import { use_action_result } from "hooks/use-action-result";
import { ChevronLeftIcon } from "lucide-react";
import { NavLink, useFetcher } from "react-router";
import type { Route } from "./+types";

export { loader, action } from "./api";
export { ErrorBoundary } from "components/error";
export const meta: Route.MetaFunction = ({ loaderData: d, location: loc }) => {
  if (!d) return [];
  return metas({ title: `Form - ${d.name}` });
};

export default function Page({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  use_action_result(fetcher.data);
  const { back_url, base_url, ...d } = loaderData;

  return (
    <div className="bg-gray-l4">
      <div className="grid py-4 content-start grid-rows-[auto_auto_1fr] lg:container lg:mx-auto px-4 lg:grid-cols-2 gap-4">
        <header className="col-span-full lg:mb-6">
          <NavLink
            to={back_url}
            className="flex text-blue hover:text-blue-d1 items-center gap-x-1"
          >
            <ChevronLeftIcon size={16} />
            <span className="text-sm">Forms</span>
          </NavLink>
          <div
            key={d.id}
            className="p-4 border border-gray-l3 rounded flex gap-2 max-lg:flex-col max-lg:items-start items-center bg-white mt-4"
          >
            {d.recipient_type === "fund" ? (
              <span className="bg-lilac inline-block text-xs px-2 py-0.5 rounded">
                Fundraiser
              </span>
            ) : d.recipient_type === "program" ? (
              <span className="bg-green-l4 inline-block text-xs px-2 py-0.5 rounded">
                Program
              </span>
            ) : (
              <span className="bg-blue-l4 inline-block text-xs px-2 py-0.5 rounded">
                Nonprofit
              </span>
            )}
            <h3 className="text-lg flex-1">{d.name}</h3>
            <Target.Inline classes="w-64" target={d.target} progress={d.ltd} />
          </div>
        </header>
        <Configurer
          classes="row-span-2"
          is_submitting={fetcher.state === "submitting"}
          increments={d.increments ?? []}
          target={to_form_target(d.target ? d.target.toString() : "0")}
          methods={fill(d.donate_methods)}
          accent_primary={d.accent_primary}
          accent_secondary={d.accent_secondary}
          on_submit={(x) =>
            fetcher.submit(x, { method: "POST", encType: "application/json" })
          }
        />
        <Snippet src={`${base_url}/forms/${d.id}`} classes="self-start" />
        <Preview {...loaderData} classes="max-lg:mt-8" />
      </div>
    </div>
  );
}
