import * as Yup from "yup";

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export type FormValues = {
  proofOfIdentity: File[];
  proofOfRegistration: File[];
  financialStatements: File[];
  auditedFinancialReports: File[];
  website: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
  un_sdg: number;
};

const COMMON_FILE_ARRAY_SCHEMA = Yup.array<File>().of(
  Yup.mixed<File>()
    .test({
      name: "fileSize",
      message: "File size must be smaller than 25Mb",
      test: (file) => (file?.size || 0) <= 25000000,
    })
    .test({
      name: "fileType",
      message: "Valid file types are PDF, JPG and PNG",
      test: (file) => VALID_MIME_TYPES.includes(file?.type || "none"),
    })
);

export const Schema = Yup.object({
  proofOfIdentity: COMMON_FILE_ARRAY_SCHEMA.test({
    name: "exactlyOne",
    message: "Proof of identity required",
    test: (arr) => arr?.length === 1,
  }),
  proofOfRegistration: COMMON_FILE_ARRAY_SCHEMA.test({
    name: "exactlyOne",
    message: "Proof of registration required",
    test: (arr) => arr?.length === 1,
  }),
  financialStatements: COMMON_FILE_ARRAY_SCHEMA,
  auditedFinancialReports: COMMON_FILE_ARRAY_SCHEMA,
  website: Yup.string()
    .required("Organization website required")
    .url("Must be a valid URL"),
  un_sdg: Yup.number().min(0),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
});
