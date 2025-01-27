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
  const [open, setOpen] = useState(false);
  return (
    <div className={`grid content-start @container ${classes}`}>
      <div className="flex gap-x-2 items-center mb-2">
        <label className="label font-medium">Videos</label>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="text-green"
        >
          <Plus size={16} />
        </button>
      </div>
      <VideoModal
        open={open}
        setOpen={setOpen}
        onSubmit={(url) => {
          props.append({ url });
          setOpen(false);
        }}
      />
      <List {...props} />
    </div>
  );
}
