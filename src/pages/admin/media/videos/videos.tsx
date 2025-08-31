import type { MediaPage } from "@better-giving/endowment";
import Breadcrumbs from "components/breadcrumbs";
import { appRoutes } from "constants/routes";
import { Plus } from "lucide-react";
import { NavLink, Outlet, useLoaderData, useParams } from "react-router";
import { List } from "./list";

export { ErrorBoundary } from "components/error";
export {
  allVideos as loader,
  videosAction as action,
} from "../api";
export default function Videos() {
  const params = useParams();
  const page1 = useLoaderData<MediaPage>();
  return (
    <div className="grid content-start @container">
      <Breadcrumbs
        className="justify-self-start text-sm mb-4"
        items={[
          {
            title: "Media",
            to: `${appRoutes.admin}/${params.id}/media`,
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
      <List classes="mt-6" page1={page1} />
      <Outlet data-video-editor />
    </div>
  );
}
