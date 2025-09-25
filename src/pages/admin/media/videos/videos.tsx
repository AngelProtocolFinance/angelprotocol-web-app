import { Breadcrumbs } from "components/breadcrumbs";
import { app_routes } from "constants/routes";
import { use_paginator } from "hooks/use-paginator";
import { Plus } from "lucide-react";
import { NavLink, Outlet, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/videos";
import { List, NoVideo } from "./list";

export {
  all_videos as loader,
  videos_action as action,
} from "../api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export default CacheRoute(Page);

function Page({ loaderData: page1, params }: Route.ComponentProps) {
  const [search] = useSearchParams();
  const { node } = use_paginator({
    page1,
    table: (p) => <List {...p} />,
    empty: (c) => <NoVideo {...c} />,
    classes: "mt-6",
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("nextPageKey", next);
      load(`?${p.toString()}`);
    },
  });
  return (
    <div className="grid content-start @container">
      <Breadcrumbs
        className="justify-self-start text-sm mb-4"
        items={[
          {
            title: "Media",
            to: `${app_routes.admin}/${params.id}/media`,
            end: true,
          },
          {
            title: "Videos",
            to: ".",
          },
        ]}
      />
      <div className="flex justify-between items-center">
        <h4 className="text-2xl capitalize mt-4">All videos</h4>
        <NavLink to="new" className="btn-outline btn text-sm px-8 py-2 gap-1">
          <Plus size={16} />
          <span>add video</span>
        </NavLink>
      </div>
      {node}
      <Outlet data-video-editor />
    </div>
  );
}
