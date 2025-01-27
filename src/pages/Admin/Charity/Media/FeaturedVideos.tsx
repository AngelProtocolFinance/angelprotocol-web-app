import type { IMedia } from "@better-giving/endowment";
import { Info } from "components/status";
import VideoPreview from "./VideoPreview";

interface Props {
  classes?: string;
  items: IMedia[];
}

export default function FeaturedVideos({ classes = "", items }: Props) {
  if (items.length === 0) {
    return <Info classes={classes}>No featured videos</Info>;
  }

  return (
    <div className={`${classes} grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4`}>
      {items.map((item) => (
        <VideoPreview key={item.id} {...item} />
      ))}
    </div>
  );
}
