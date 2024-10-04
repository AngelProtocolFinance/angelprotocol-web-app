import { BYTES_IN_MB } from "constants/common";
import { fileDropzoneAssetShape } from "schemas/file";
import { alphanumeric, requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import type { MIMEType } from "types/lists";
import { type ObjectSchema, object } from "yup";
import type { FormValues } from "./types";

export const MB_LIMIT = 6;

export const VALID_MIME_TYPES: MIMEType[] = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const assetShape = fileDropzoneAssetShape(
  MB_LIMIT * BYTES_IN_MB,
  VALID_MIME_TYPES,
  true
);

export const schema = object<any, SchemaShape<FormValues>>({
  registration_number: requiredString.matches(
    alphanumeric,
    "must only contain numbers and letters"
  ),
  proof_of_identity: assetShape,
  proof_of_reg: assetShape,
  legal_entity_type: requiredString.trim(),
  project_description: requiredString
    .trim()
    .max(4000, "maximum 4000 characters allowed"),
}) as ObjectSchema<FormValues>;
