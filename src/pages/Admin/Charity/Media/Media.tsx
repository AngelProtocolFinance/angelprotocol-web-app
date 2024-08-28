import Icon from "components/Icon";
import { useModalContext } from "contexts/ModalContext";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../Context";
import FeaturedVideos from "./FeaturedVideos";
import VideoEditor from "./VideoEditor";

export default function Media() {
  const { id } = useAdminContext();
  const { showModal } = useModalContext();

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Media</h3>
      <div className="border border-gray-l4 rounded p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl">Videos</h4>
          <button
            onClick={() => showModal(VideoEditor, {})}
            type="button"
            className="btn-outline-filled text-sm px-8 py-2 gap-1"
          >
            <Icon type="Plus" size={16} />
            <span>add video</span>
          </button>
        </div>
        <h5 className="text-lg mt-10">Featured videos</h5>
        <FeaturedVideos endowId={id} classes="mt-4" />
        <Link
          to="videos"
          className="btn-outline-filled text-sm py-3 rounded mt-4"
        >
          View all videos
        </Link>
      </div>
    </div>
  );
}
