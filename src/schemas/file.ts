import * as Yup from "yup";
import { FileObject } from "types/aws";
import { FileDropzoneAsset } from "types/components";

const mimeTypeObjects = [
  { type: "image/jpeg", name: "JPEG" },
  { type: "image/png", name: "PNG" },
  { type: "application/pdf", name: "PDF" },
  { type: "image/webp", name: "WEBP" },
  { type: "image/svg", name: "SVG" },
] as const;

export type MIMEType = (typeof mimeTypeObjects)[number]["name"];

const previewsKey: keyof FileDropzoneAsset = "previews";

export function fileDropzoneAssetShape(
  maxByteSize: number,
  validMimeTypes: MIMEType[],
  required = false
) {
  return Yup.object({
    files: Yup.array(genFileSchema(maxByteSize, validMimeTypes)).when(
      previewsKey,
      ([previews], schema) =>
        (previews as FileObject[]).length <= 0 && required
          ? schema.min(1, "required")
          : schema
    ),
  });
}

/**
 * @param maxSize maximum file size in bytes
 * @param types an array of strings representing valid MIME types
 * @returns Yup schema for validating files
 */
export const genFileSchema = (maxSize: number, types: MIMEType[]) =>
  Yup.mixed<File>()
    .test({
      name: "must be of correct type",
      message: "invalid file type",
      test: (file) => !file || !!types.find((mime) => mime === file.type),
    })
    .test({
      name: "must be less than size limit",
      message: "exceeds file size limit",
      test: (file) => (file?.size || 0) <= maxSize,
    });
