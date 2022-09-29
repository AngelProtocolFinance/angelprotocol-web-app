import * as Yup from "yup";
import { DocumentationValues } from "pages/Registration/types";
import { SchemaShape } from "schemas/types";
import { FileWrapper } from "components/FileDropzone";

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const FILE_SCHEMA = Yup.mixed<FileWrapper>()
  .test({
    name: "fileSize",
    message: "File size must be smaller than 25Mb",
    test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 25e6,
  })
  .test({
    name: "fileType",
    message: "Valid file types are PDF, JPG, PNG and WEBP",
    test: (fileWrapper) =>
      fileWrapper?.file
        ? VALID_MIME_TYPES.includes(fileWrapper.file.type)
        : true,
  })
  .test({
    name: "invalidState",
    message: "Invalid internal state",
    test: (fileWrapper) =>
      // fileWrapper must be instantiated
      !!fileWrapper &&
      // file name must be set
      !!fileWrapper.name &&
      // either new file is uploaded or source URL to file is set
      (!!fileWrapper.file || !!fileWrapper.publicUrl),
  });

const documentationShape: SchemaShape<DocumentationValues> = {
  proofOfIdentity: FILE_SCHEMA.required("Proof of identity required"),
  proofOfRegistration: FILE_SCHEMA.required("Proof of registration required"),
  financialStatements: Yup.array<FileWrapper>().of(FILE_SCHEMA),
  auditedFinancialReports: Yup.array<FileWrapper>().of(FILE_SCHEMA),
  website: Yup.string()
    .required("Organization website required")
    .url("Must be a valid URL"),
  un_sdg: Yup.number().min(1, "UNSDG must be selected").max(17),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
};

export const documentationSchema = Yup.object(documentationShape);
