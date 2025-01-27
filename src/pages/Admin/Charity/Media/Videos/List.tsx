import type { MediaPage } from "@better-giving/endowment";
import { useFetcher } from "@remix-run/react";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import VideoPreview from "../video-preview";

interface Props {
  classes?: string;
  page1: MediaPage;
}

export function List({ classes = "", page1 }: Props) {
  const { state, data, load } = useFetcher<MediaPage>();

  const [items, setItems] = useState<MediaPage["items"]>(page1.items);

  useEffect(() => {
    setItems(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (state !== "idle" || !data) return;
    setItems((prev) => [...prev, ...data.items]);
  }, [state, data]);

  if (items.length === 0) return <NoVideo classes={classes} />;

  const nextPageKey = data ? data.nextPageKey : page1.nextPageKey;

  return (
    <div className={`${classes} grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4`}>
      {items.map((item) => (
        <VideoPreview key={item.id} {...item} />
      ))}
      {nextPageKey && (
        <button
          disabled={state !== "idle"}
          type="button"
          onClick={() => load(`?nextPageKey=${nextPageKey}`)}
          className="col-span-full btn-outline-filled text-sm py-3"
        >
          {state !== "idle" ? "Loading..." : "Load more videos"}
        </button>
      )}
    </div>
  );
}

function NoVideo({ classes = "" }) {
  return (
    <div
      className={`bg-white ${classes} grid justify-items-center rounded-sm border border-gray-l4 px-4 py-16`}
    >
      <Image className="text-navy-l2 text-2xl mb-6" />
      <p className="font-bold mb-2">Start by adding your first video</p>
      <p className="text-sm text-navy-l1">
        You have no videos. To add one, use the{" "}
        <span className="text-navy-d4 font-bold">Add video</span> button above.
      </p>
    </div>
  );
}
