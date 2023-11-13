import { ObjectSchema, array, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { FileObject } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { genFileSchema } from "schemas/file";
import { requiredString } from "schemas/string";

export const MB_LIMIT = 6;
const BYTES_IN_MB = 1e6;

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const previewsKey: keyof FileDropzoneAsset = "previews";

function genAssetShape(
  isRequired: boolean = false
): SchemaShape<FileDropzoneAsset> {
  return {
    files: array(genFileSchema(MB_LIMIT * BYTES_IN_MB, VALID_MIME_TYPES)).when(
      previewsKey,
      ([previews], schema) =>
        (previews as FileObject[]).length <= 0 && isRequired
          ? schema.min(1, "required")
          : schema
    ),
  };
}

export const schema = object<any, SchemaShape<FormValues>>({
  RegistrationNumber: requiredString,
  ProofOfIdentity: object(genAssetShape(true)),
  ProofOfRegistration: object(genAssetShape(true)),
  LegalEntityType: requiredString,
  ProjectDescription: requiredString.max(
    4000,
    "maximum 4000 characters allowed"
  ),
}) as ObjectSchema<FormValues>;
