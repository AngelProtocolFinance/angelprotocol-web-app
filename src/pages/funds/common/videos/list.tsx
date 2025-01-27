import { Info } from "components/status";
import type { UseFieldArrayReturn } from "react-hook-form";
import type { FV } from "./types";
import { VideoPreview } from "./video-preview";

interface IList extends UseFieldArrayReturn<FV, "videos", "id"> {
  classes?: string;
}
export function List({ classes = "", ...fieldArray }: IList) {
  if (fieldArray.fields.length === 0) {
    return <Info>No videos</Info>;
  }
  return (
    <div className={`${classes} grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4`}>
      {fieldArray.fields.map((v, idx) => (
        <VideoPreview
          key={idx}
          idx={idx}
          {...v}
          onEdit={(url) => {
            fieldArray.update(idx, { url });
          }}
          onDelete={(idx) => {
            fieldArray.remove(idx);
          }}
        />
      ))}
    </div>
  );
}
