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

function genAssetShape(isRequired: boolean = false): SchemaShape<Asset> {
  return {
    files: Yup.array(genFileSchema(25e6, VALID_MIME_TYPES)).when(
      previewsKey,
      (previews: FileObject[], schema: any) =>
        previews.length <= 0 && isRequired ? schema.min(1, "required") : schema
    ),
  };
}

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  proofOfIdentity: Yup.object().shape(genAssetShape(true)),
  proofOfRegistration: Yup.object().shape(genAssetShape(true)),
  financialStatements: Yup.object().shape(genAssetShape()),
  auditedFinancialReports: Yup.object().shape(genAssetShape()),
  website: asciiSchema
    .required("Organization website required")
    .url("Must be a valid URL"),
  sdg: Yup.number().min(1, "UNSDG must be selected").max(17),
  hasAuthority: Yup.bool().isTrue("must have authority"),
  hasAgreedToTerms: Yup.bool().isTrue("must agree to terms"),
});
