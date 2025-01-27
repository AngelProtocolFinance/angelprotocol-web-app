import type { ImgSpec } from "components/img-editor";

export const imgSpec = (aspect: [number, number], rounded = false): ImgSpec => {
  return {
    maxSize: 1e6,
    type: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    aspect,
    rounded,
  };
};

export const MAX_CHARS = 500;
