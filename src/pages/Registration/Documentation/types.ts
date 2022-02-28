import * as Yup from "yup";

export type FormValues = {
  proofOfIdentity: File;
  proofOfRegistration: File;
  financialStatements: File[];
  auditedFinancialReport: File[];
  charityWebsite: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
};

export const Schema = Yup.object({
  proofOfIdentity: Yup.object().required("Proof of identity required"),
  proofOfRegistration: Yup.object().required("Proof of registration required"),
  financialStatements: Yup.array(),
  auditedFinancialReport: Yup.array(),
  charityWebsite: Yup.string().required("Organization website required"),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
});
