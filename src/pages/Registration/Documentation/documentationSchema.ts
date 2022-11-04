import { FileObject } from "files-from-path";
import * as Yup from "yup";
import { DocumentationValues } from "pages/Registration/types";
import { SchemaShape } from "schemas/types";
import { Asset } from "components/FileDrop";
import { genFileSchema } from "schemas/file";

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

const documentationShape: SchemaShape<DocumentationValues> = {
  proofOfIdentity: Yup.object().shape(assetShape),
  proofOfRegistration: Yup.object().shape(assetShape),
  financialStatements: Yup.object().shape(assetShape),
  auditedFinancialReports: Yup.object().shape(assetShape),
  website: Yup.string()
    .required("Organization website required")
    .url("Must be a valid URL"),
  un_sdg: Yup.number().min(1, "UNSDG must be selected").max(17),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
};

export const documentationSchema = Yup.object(documentationShape);
