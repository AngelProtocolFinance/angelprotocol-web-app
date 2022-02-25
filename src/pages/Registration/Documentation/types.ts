import * as Yup from "yup";

export type FormValues = {
  charityWebsite: string;
  checkedAuthority: boolean;
  checkedPolicy: boolean;
};

export const Schema = Yup.object({
  charityWebsite: Yup.string().required("Organization website required"),
  checkedAuthority: Yup.bool().isTrue("Authority checkbox must be checked"),
  checkedPolicy: Yup.bool().isTrue("Policy checkbox must be checked"),
});
