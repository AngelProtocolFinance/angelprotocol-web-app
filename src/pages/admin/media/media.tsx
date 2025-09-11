import { Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types/media";
import FeaturedVideos from "./featured-videos";

export {
  featured_media as loader,
  videos_action as action,
} from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export { ErrorBoundary } from "components/error";
export default CacheRoute(Media);

function Media({ loaderData: featured_page }: Route.ComponentProps) {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Media</h3>
      <div className="border border-gray-l3 rounded-sm p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl">Videos</h4>
          <NavLink to="new" className="btn-outline btn text-sm px-8 py-2 gap-1">
            <Plus size={16} />
            <span>add video</span>
          </NavLink>
        </div>
        <h5 className="text-lg mt-10">Featured videos</h5>
        <FeaturedVideos items={featured_page.items} classes="mt-4" />
        <NavLink
          to="videos"
          className="btn-outline btn text-sm py-3 rounded-sm mt-4"
        >
          View all videos
        </NavLink>
        {/** video editor modal */}
        <Outlet />
      </div>
    </div>
  );
}
