import * as Yup from "yup";
import { FileObject } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { isEmpty } from "helpers";

const MIME_TYPES = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  PDF: "application/pdf",
  WEBP: "image/webp",
  SVG: "image/svg",
};

export type MIMEType = keyof typeof MIME_TYPES;

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
        isEmpty(previews as FileObject[]) && required
          ? schema.min(1, "required")
          : schema
    ),
  });
}

/**
 * @param maxSize maximum file size in bytes
 * @param mimeTypes an array of strings representing valid MIME types
 * @returns Yup schema for validating files
 */
export const genFileSchema = (maxSize: number, mimeTypes: MIMEType[]) =>
  Yup.mixed<File>()
    .test({
      name: "must be of correct type",
      message: "invalid file type",
      test: (file) =>
        !file || !!mimeTypes.find((type) => MIME_TYPES[type] === file.type),
    })
    .test({
      name: "must be less than size limit",
      message: "exceeds file size limit",
      test: (file) => (file?.size || 0) <= maxSize,
    });
