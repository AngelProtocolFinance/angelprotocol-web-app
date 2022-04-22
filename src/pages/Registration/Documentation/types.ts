import * as Yup from "yup";
import { FileWrapper } from "components/FileDropzone/types";

export type FormValues = {
  // Expects an array because FileDropzone component always returns an array of Files,
  // so this way it's easier to handle (Yup validation ensures single file uploaded)
  proofOfIdentity: FileWrapper | string;
  proofOfRegistration: FileWrapper | string;
  financialStatements: FileWrapper[] | string[];
  auditedFinancialReports: FileWrapper[] | string[];
  website: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
  un_sdg: number;
};

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
      (!!fileWrapper.file || !!fileWrapper.sourceUrl),
  });

export const SCHEMA = Yup.object({
  proofOfIdentity: FILE_SCHEMA,
  proofOfRegistration: FILE_SCHEMA,
  financialStatements: Yup.array<FileWrapper>().of(FILE_SCHEMA),
  auditedFinancialReports: Yup.array<FileWrapper>().of(FILE_SCHEMA),
  website: Yup.string()
    .required("Organization website required")
    .url("Must be a valid URL"),
  un_sdg: Yup.number().min(0),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
});
