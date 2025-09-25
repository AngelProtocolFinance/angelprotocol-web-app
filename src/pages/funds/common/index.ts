import type { ImgSpec } from "components/img-editor";

export const img_spec = (aspect: [number, number]): ImgSpec => ({
  type: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  aspect: aspect,
  max_size: 4e6,
});
export const MAX_CHARS = 4000;
