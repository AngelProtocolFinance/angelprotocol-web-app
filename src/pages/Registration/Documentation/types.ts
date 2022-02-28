import * as Yup from "yup";

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

export const Schema = Yup.object({
  proofOfIdentity: Yup.mixed().required("Proof of identity required"),
  proofOfRegistration: Yup.mixed().required("Proof of registration required"),
  financialStatements: Yup.array().of(Yup.mixed()),
  auditedFinancialReport: Yup.array().of(Yup.mixed()),
  charityWebsite: Yup.string().required("Organization website required"),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
  un_sdg: Yup.number().min(0),
});
