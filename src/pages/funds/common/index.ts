import type { ImgSpec } from "components/img-editor";

export const imgSpec = (aspect: [number, number]): ImgSpec => ({
  type: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  aspect: aspect,
  maxSize: 4e6,
});
export const MAX_CHARS = 4000;
