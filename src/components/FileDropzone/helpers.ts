import { FileObject } from "types/aws";
import { Asset } from "types/components";

export const asset = (previews: FileObject[]): Asset => ({
  files: [],
  previews,
});
