import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { MIMEType, fileDropzoneAssetShape } from "schemas/file";
import { requiredString } from "schemas/string";
import { BYTES_IN_MB } from "constants/common";

export const MB_LIMIT = 6;

export const VALID_MIME_TYPES: MIMEType[] = ["JPEG", "PNG", "PDF", "WEBP"];

const assetShape = fileDropzoneAssetShape(
  MB_LIMIT * BYTES_IN_MB,
  VALID_MIME_TYPES,
  true
);

export const schema = object<any, SchemaShape<FormValues>>({
  RegistrationNumber: requiredString,
  ProofOfIdentity: assetShape,
  ProofOfRegistration: assetShape,
  LegalEntityType: requiredString,
  ProjectDescription: requiredString.max(
    4000,
    "maximum 4000 characters allowed"
  ),
}) as ObjectSchema<FormValues>;
