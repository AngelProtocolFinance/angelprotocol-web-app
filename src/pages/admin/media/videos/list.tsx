import type { IMedia } from "@better-giving/endowment";
import { Image } from "lucide-react";
import type { IPaginator } from "types/components";
import VideoPreview from "../video-preview";

interface Props extends IPaginator<IMedia> {}

export function List({ classes = "", ...props }: Props) {
  return (
    <div className={`${classes} grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4`}>
      {props.items.map((item) => (
        <VideoPreview key={item.id} {...item} />
      ))}
      {props.load_next && (
        <button
          disabled={props.disabled || props.loading}
          type="button"
          onClick={props.load_next}
          className="col-span-full btn-outline btn text-sm py-3"
        >
          {props.loading ? "Loading..." : "Load more videos"}
        </button>
      )}
    </div>
  );
}

export function NoVideo({ classes = "" }) {
  return (
    <div
      className={`bg-white ${classes} grid justify-items-center rounded-sm border border-gray-l3 px-4 py-16`}
    >
      <Image className="text-gray text-2xl mb-6" />
      <p className="font-bold mb-2">Start by adding your first video</p>
      <p className="text-sm text-gray">
        You have no videos. To add one, use the{" "}
        <span className="text-gray-d4 font-bold">Add video</span> button above.
      </p>
    </div>
  );
}
