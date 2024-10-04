import type { ImageMIMEType } from "types/lists";
export { target, type TargetType } from "./types";

export * from "./GoalSelector";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 4000;
