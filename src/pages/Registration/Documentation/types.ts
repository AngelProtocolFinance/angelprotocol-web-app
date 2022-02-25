import * as Yup from "yup";

export type FormValues = {
  proofOfIdentity: File[];
  charityWebsite: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
};

export const Schema = Yup.object({
  proofOfIdentity: Yup.array().length(1).required("Proof of identity required"),
  charityWebsite: Yup.string().required("Organization website required"),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
});
