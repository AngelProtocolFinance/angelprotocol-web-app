import type { ImgSpec } from "components/ImgEditor";
export { target, type TargetType } from "./types";

export * from "./GoalSelector";

export const imgSpec = (aspect: [number, number]): ImgSpec => ({
  type: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  aspect: aspect,
  maxSize: 1e6,
});
export const MAX_CHARS = 4000;
