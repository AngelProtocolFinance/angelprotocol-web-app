import { FileObject } from "types/aws";
import { FileDropzoneAsset } from "types/components";

export const asset = (previews: FileObject[]): FileDropzoneAsset => ({
  files: [],
  previews,
});
