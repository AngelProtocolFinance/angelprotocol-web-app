import { Plus } from "lucide-react";
import { useState } from "react";
import type { UseFieldArrayReturn } from "react-hook-form";
import { List } from "./list";
import type { FV } from "./types";
import { VideoModal } from "./video-modal";

interface IVideos extends UseFieldArrayReturn<FV, "videos", "id"> {
  classes?: string;
}
export function Videos({ classes = "", ...props }: IVideos) {
  const [open, set_open] = useState(false);
  return (
    <div className={`grid content-start @container ${classes}`}>
      <div className="flex gap-x-2 items-center">
        <label className="label font-medium">Videos</label>
        <button
          onClick={() => set_open(true)}
          type="button"
          className="text-green"
        >
          <Plus size={16} />
        </button>
      </div>
      <p id="videos-description" className="text-gray text-sm mb-2">
        Upload a video or two about your fundraiser - you could use a video from
        your chosen nonprofit.
      </p>
      <VideoModal
        open={open}
        set_open={set_open}
        onSubmit={(url) => {
          props.append({ url });
          set_open(false);
        }}
      />
      <List {...props} />
    </div>
  );
}
