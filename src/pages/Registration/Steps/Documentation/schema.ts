import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { FileObject } from "types/aws";
import { Asset } from "components/registration";
import { genFileSchema } from "schemas/file";

export const MB_LIMIT = 25;
const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const previewsKey: keyof Asset = "previews";

function genAssetShape(isRequired: boolean = false): SchemaShape<Asset> {
  return {
    files: Yup.array(genFileSchema(MB_LIMIT * 1e6, VALID_MIME_TYPES)).when(
      previewsKey,
      (previews: FileObject[], schema: any) =>
        previews.length <= 0 && isRequired ? schema.min(1, "required") : schema
    ),
  };
}

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  proofOfIdentity: Yup.object().shape(genAssetShape(true)),
  proofOfRegistration: Yup.object().shape(genAssetShape(true)),
  website: Yup.string().required("required").url("invalid url"),
  sdgs: Yup.array().min(1, "required"),

  //level 2-3 fields not required
  financialStatements: Yup.object().shape(genAssetShape()),
  auditedFinancialReports: Yup.object().shape(genAssetShape()),
  //isKYCRequired defaulted to No on default value

  hasAuthority: Yup.bool().isTrue(
    "Please confirm that you have the authority to create this endowment"
  ),
  hasAgreedToTerms: Yup.bool().isTrue(
    "Please confirm that you agree to our Terms and Conditions"
  ),
});
