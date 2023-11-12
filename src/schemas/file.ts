import * as Yup from "yup";
import { SchemaShape } from "./types";
import { FileObject } from "types/aws";
import { Asset } from "components/registration";

export const MB_LIMIT = 6;

const BYTES_IN_MB = 1e6;

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const previewsKey: keyof Asset = "previews";

export function genAssetShape(isRequired = false): SchemaShape<Asset> {
  return {
    files: Yup.array(
      genFileSchema(MB_LIMIT * BYTES_IN_MB, VALID_MIME_TYPES)
    ).when(previewsKey, ([previews], schema) =>
      (previews as FileObject[]).length <= 0 && isRequired
        ? schema.min(1, "required")
        : schema
    ),
  };
}

/**
 * @param maxSize maximum file size in bytes
 * @param types an array of strings representing valid MIME types
 * @returns Yup schema for validating files
 */
export const genFileSchema = (maxSize: number, types: string[]) =>
  Yup.mixed<File>()
    .test({
      name: "must be of correct type",
      message: "invalid file type",
      test: (file) => (file ? types.includes(file.type) : true),
    })
    .test({
      name: "must be less than size limit",
      message: "exceeds file size limit",
      test: (file) => (file?.size || 0) <= maxSize,
    });
