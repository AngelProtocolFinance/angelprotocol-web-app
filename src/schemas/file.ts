import { isEmpty } from "helpers";
import { FileObject } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { MIMEType } from "types/lists";
import * as Yup from "yup";

const previewsKey: keyof FileDropzoneAsset = "previews";

export function fileDropzoneAssetShape(
  maxByteSize: number,
  validMimeTypes: MIMEType[],
  required = false,
) {
  return Yup.object({
    files: Yup.array(genFileSchema(maxByteSize, validMimeTypes)).when(
      previewsKey,
      ([previews], schema) =>
        isEmpty(previews as FileObject[]) && required
          ? schema.min(1, "required")
          : schema,
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
      test: (file) => !file || !!mimeTypes.find((type) => type === file.type),
    })
    .test({
      name: "must be less than size limit",
      message: "exceeds file size limit",
      test: (file) => (file?.size || 0) <= maxSize,
    });
