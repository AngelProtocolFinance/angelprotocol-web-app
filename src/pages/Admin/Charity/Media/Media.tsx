import type { MediaPage } from "@better-giving/endowment";
import { NavLink, Outlet } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { Plus } from "lucide-react";
import FeaturedVideos from "./FeaturedVideos";

export {
  featuredMedia as loader,
  videosAction as action,
} from "./api";

export { clientLoader } from "api/cache";

export { ErrorBoundary } from "components/error";
export default function Media() {
  const featuredPage = useCachedLoaderData<MediaPage>();

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Media</h3>
      <div className="border border-gray-l4 rounded-sm p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl">Videos</h4>
          <NavLink
            to="new"
            className="btn-outline-filled text-sm px-8 py-2 gap-1"
          >
            <Plus size={16} />
            <span>add video</span>
          </NavLink>
        </div>
        <h5 className="text-lg mt-10">Featured videos</h5>
        <FeaturedVideos items={featuredPage.items} classes="mt-4" />
        <NavLink
          to="videos"
          className="btn-outline-filled text-sm py-3 rounded-sm mt-4"
        >
          View all videos
        </NavLink>
        {/** video editor modal */}
        <Outlet />
      </div>
    </div>
  );
}
