import * as v from "valibot";
const str = v.pipe(v.string("required"), v.trim());
export const videoUrl = v.pipe(
  str,
  v.nonEmpty("required"),
  v.url("invalid url")
);
export const video = v.object({
  url: videoUrl,
});

export interface Video extends v.InferOutput<typeof video> {}

export interface FV {
  videos: Video[];
}
