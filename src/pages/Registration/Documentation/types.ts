import * as Yup from "yup";

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export type FormValues = {
  proofOfIdentity: File;
  proofOfRegistration: File;
  financialStatements: File[];
  auditedFinancialReport: File[];
  charityWebsite: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
  un_sdg: number;
};

const COMMON_FILE_SCHEMA = Yup.mixed<File>()
  .test({
    name: "fileSize",
    message: "File size must be smaller than 25Mb",
    test: (file) => (file?.size || 0) <= 25000000,
  })
  .test({
    name: "fileType",
    message: "Valid file types are PDF, JPG and PNG",
    test: (file) => VALID_MIME_TYPES.includes(file?.type || "none"),
  });

export const Schema = Yup.object({
  proofOfIdentity: COMMON_FILE_SCHEMA.required("Proof of identity required"),
  proofOfRegistration: COMMON_FILE_SCHEMA.required(
    "Proof of registration required"
  ),
  financialStatements: Yup.array<File>().of(COMMON_FILE_SCHEMA),
  auditedFinancialReport: Yup.array<File>().of(COMMON_FILE_SCHEMA),
  charityWebsite: Yup.string().required("Organization website required"),
  un_sdg: Yup.number().min(0),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
});
