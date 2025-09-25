import type { ImgSpec } from "components/img-editor";

export const img_spec = (
  aspect: [number, number],
  rounded = false
): ImgSpec => {
  return {
    max_size: 4e6,
    type: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    aspect,
    rounded,
  };
};

export const MAX_CHARS = 500;
