import type { MediaPage } from "@better-giving/endowment";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Plus } from "lucide-react";
import FeaturedVideos from "./FeaturedVideos";

export {
  featuredMedia as loader,
  videosAction as action,
} from "./api";

export { ErrorBoundary } from "components/error";
export default function Media() {
  const featuredPage = useLoaderData() as MediaPage;

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Media</h3>
      <div className="border border-gray-l4 rounded p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl">Videos</h4>
          <Link to="new" className="btn-outline-filled text-sm px-8 py-2 gap-1">
            <Plus size={16} />
            <span>add video</span>
          </Link>
        </div>
        <h5 className="text-lg mt-10">Featured videos</h5>
        <FeaturedVideos items={featuredPage.items} classes="mt-4" />
        <Link
          to="videos"
          className="btn-outline-filled text-sm py-3 rounded mt-4"
        >
          View all videos
        </Link>
        {/** video editor modal */}
        <Outlet />
      </div>
    </div>
  );
}
