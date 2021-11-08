import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useAddNewKeyCharityMutation,
  useUpdateKeyPersonDataMutation,
} from "services/aws/keyPerson";

export type KeyPersoData = {
  FullName: string;
  Title: string;
  HeadshotPicture?: string;
  Email?: string;
  Twitter?: string;
  Linkedin?: string;
  Quote: string;
  uuid?: string;
};

export const ProfileSchema = Yup.object().shape({
  FullName: Yup.string().required("Please enter the full name."),
  Title: Yup.string().required("Please enter the title."),
  Email: Yup.string()
    .required("Please enter your email address")
    .email("Please enter the correct email address."),
  Quote: Yup.string()
    .required("Please enter the description.")
    .min(120, "Description must be more than 120 letters."),
});

export const useKeyPersonProfile = () => {
  const [createKeyPersonProfile] = useAddNewKeyCharityMutation();
  const [updateKeyPersonProfile] = useUpdateKeyPersonDataMutation();

  const saveKeyPersonData = async (
    keyPersonData: KeyPersoData,
    fileContent: string,
    is_create: boolean
  ) => {
    const postData = {
      ...keyPersonData,
      HeadshotPicture: fileContent,
    };
    let result: any = {};
    if (is_create) {
      const response: any = await createKeyPersonProfile(postData);
      result = response.data ? response : response.error;
    } else {
      const response: any = await updateKeyPersonProfile(postData);
      result = response.data ? response : response.error;
    }
    if (result.status === 500) {
      toast.error("Saving data was failed. Please try again.");
    } else if (result.error) {
      toast.error(result.error.data.message);
    } else {
      if (
        result.status === 400 ||
        result.status === 401 ||
        result.status === 403
      ) {
        toast.error(result.data.message);
      } else {
        toast.success("Your key person data was saved successfully.");
      }
    }
  };

  const readFileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);

      reader.onload = () => {
        return resolve(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });

  return { saveKeyPersonData, readFileToBase64 };
};
