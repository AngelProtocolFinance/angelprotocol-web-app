import { fill } from "components/donate-methods";
import { Configurer } from "./configurer";
import { Preview } from "./preview";
import { Snippet } from "./snippet";

import { to_form_target } from "components/goal-selector";
import { Target } from "components/target";
import { metas } from "helpers/seo";
import { use_action_result } from "hooks/use-action-result";
import { ChevronLeftIcon, TagIcon } from "lucide-react";
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
          {d.tag && (
            <p className="-mb-3 mt-2 pl-2">
              <TagIcon size={13} className="inline-block  mr-1" />
              <span className=" text-sm">{d.tag}</span>
            </p>
          )}
          <div
            key={d.id}
            className="p-4 border border-gray-l3 rounded flex gap-2 max-lg:flex-col max-lg:items-start items-center bg-white mt-4 gap-y-4"
          >
            <div className="flex-1">
              <h3 className="text-lg flex-1">{d.name}</h3>
              {d.program && (
                <p className="text-sm text-gray-d4 mt-1">
                  <span className="text-2xs bg-gray-l4 p-1 rounded-xs">
                    Program
                  </span>{" "}
                  <span className="text-sm font-medium text-gray">
                    {d.program.name}
                  </span>
                </p>
              )}
            </div>
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
          tag={d.tag}
          on_submit={(x) =>
            fetcher.submit(x, { method: "POST", encType: "application/json" })
          }
        />
        <Snippet base_url={base_url} form_id={d.id} classes="self-start" />
        <Preview {...loaderData} classes="mt-4" />
      </div>
    </div>
  );
}
