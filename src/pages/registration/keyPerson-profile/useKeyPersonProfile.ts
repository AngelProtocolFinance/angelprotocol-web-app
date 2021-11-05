import * as Yup from "yup";
// import {
//   useUpdateKeyPersonDataMutation,
//   useAddNewKeyCharityMutation,
// } from "api/keyPersonAPIs";
import { FormikHelpers } from "formik";

export type KeyPersoData = {
  FullName: string;
  Title: string;
  HeadshotPicture: string;
  Email?: string;
  Twitter?: string;
  Linkedin?: string;
  Quote: string;
  PK?: string;
};

export const ProfileSchema = Yup.object().shape({
  FullName: Yup.string().required("Please enter the full name."),
  Title: Yup.string().required("Please enter the title."),
  Email: Yup.string()
    .required("Please enter your email address")
    .email("Please enter the correct email address."),
  ProfilePicture: Yup.string().required("Please upload your profile picture."),
  Quote: Yup.string()
    .required("Please enter the description.")
    .min(120, "Description must be more than 120 letters."),
});

export const useKeyPersonProfile = () => {
  // const [createKeyPersonProfile] = useAddNewKeyCharityMutation();
  // const [updateKeyPersonProfile] = useUpdateKeyPersonDataMutation();

  async function saveKeyPersonData(
    keyPersonData: KeyPersoData,
    actions: FormikHelpers<KeyPersoData>
  ) {
    actions.setSubmitting(true);
    // const is_create = !keyPersonData?.PK;
  }

  async function uploadAvatar() {}

  return { saveKeyPersonData, uploadAvatar };
};
