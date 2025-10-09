import { ReactPlayer } from "components/react-player";
import { Minus, Pencil } from "lucide-react";
import { type ButtonHTMLAttributes, useState } from "react";
import type { Video } from "./types";
import { VideoModal } from "./video-modal";

interface IVideoPreview extends Video {
  idx: number;
  onEdit: (url: string, idx: number) => void;
  onDelete: (idx: number) => void;
}

export function VideoPreview(props: IVideoPreview) {
  const [open, set_open] = useState(false);
  return (
    <div className="text-gray-d4">
      <VideoModal
        open={open}
        set_open={set_open}
        onSubmit={(url) => props.onEdit(url, props.idx)}
        initUrl={props.url}
      />
      <div className="flex justify-end mb-1">
        <CRUDBtn onClick={() => set_open(true)}>
          <Pencil size={12} />
        </CRUDBtn>
        <CRUDBtn onClick={() => props.onDelete(props.idx)}>
          <Minus className="text-red" />
        </CRUDBtn>
      </div>
      {/** render only thumbnails on lists */}
      {/** @see https://github.com/CookPete/react-player/issues/145 */}
      <div className="relative pt-[56.25%] aspect-16/9 rounded-lg overflow-clip">
        <ReactPlayer
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          url={props.url}
          width="100%"
          height="100%"
          light
          playIcon={<></>}
        />
      </div>
    </div>
  );
}

function CRUDBtn({
  className,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  return (
    <button
      {...props}
      type="button"
      className={`p-1.5 text-lg rounded-full hover:bg-blue-l4 group disabled:text-gray-l1 ${className}`}
    >
      {children}
    </button>
  );
}
