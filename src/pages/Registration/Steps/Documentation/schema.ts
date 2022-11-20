import { FileObject } from "files-from-path";
import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { Asset } from "components/FileDropzone";
import { genFileSchema } from "schemas/file";
import { asciiSchema } from "schemas/string";

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const previewsKey: keyof Asset = "previews";

const assetShape: SchemaShape<Asset> = {
  files: Yup.array(genFileSchema(25e6, VALID_MIME_TYPES)).when(
    previewsKey,
    (previews: FileObject[], schema: any) =>
      previews.length <= 0 ? schema.min(1, "required") : schema
  ),
};

const docSchema = Yup.object().shape(assetShape);

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  proofOfIdentity: docSchema,
  proofOfRegistration: docSchema,
  financialStatements: docSchema,
  auditedFinancialReports: docSchema,
  website: asciiSchema
    .required("Organization website required")
    .url("Must be a valid URL"),
  sdg: Yup.number().min(1, "UNSDG must be selected").max(17),
  hasAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  hasAgreedToTerms: Yup.bool().isTrue("Policy checkbox must be checked"),
});
