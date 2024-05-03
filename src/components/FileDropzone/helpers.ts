import type { FileObject } from "types/aws";
import type { FileDropzoneAsset } from "types/components";

export const asset = (previews: FileObject[]): FileDropzoneAsset => ({
  files: [],
  previews,
});
