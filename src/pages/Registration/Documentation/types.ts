import * as Yup from "yup";

export type FormValues = {
  charityWebsite: string;
};

export const Schema = Yup.object().shape({
  charityWebsite: Yup.string().required("Organization website required"),
});
