import { useModalContext } from "contexts/ModalContext";
import { Plus } from "lucide-react";
import type { UseFieldArrayReturn } from "react-hook-form";
import { List } from "./list";
import type { FV } from "./types";
import { VideoModal } from "./video-modal";

interface IVideos extends UseFieldArrayReturn<FV, "videos", "id"> {
  classes?: string;
}
export function Videos({ classes = "", ...props }: IVideos) {
  const { showModal } = useModalContext();
  return (
    <div className={`grid content-start @container ${classes}`}>
      <div className="flex gap-x-2 items-center mb-2">
        <label className="label font-medium">Videos</label>
        <button
          onClick={() =>
            showModal(VideoModal, { onSubmit: (url) => props.append({ url }) })
          }
          type="button"
          className="text-green"
        >
          <Plus size={16} />
        </button>
      </div>
      <List {...props} />
    </div>
  );
}
