import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useAddCharityMetadataMutation,
  useUpdateCharityMetadataMutation,
} from "services/aws/charity";

export type CharityMetaData = {
  CompanyNumber?: string;
  CountryIncorporation?: string;
  IsYourCountry?: boolean;
  SelectCountries?: string;
  VisionStatement?: string;
  MissionStatement?: string;
  UN_SDG?: string;
  AnnualRevenue?: string;
  OperatingExpense?: string;
  Currency?: string;
  Website?: string;
  ContactEmail?: string;
  Twitter?: string;
  YouTube?: string;
  Linkedin?: string;
  Facebook?: string;
  Instagram?: string;
  TikTok?: string;
  Logo?: string;
  Banner?: string;
  VideoEmbed?: string;
};

export const StepOneSchema = Yup.object().shape({
  CompanyNumber: Yup.number().required("Please enter your company number"),
  CountryIncorporation: Yup.string().required(
    "please select the country of incorporation."
  ),
  SelectCountries: Yup.string().required(`Please select the countries.`),
  VisionStatement: Yup.string()
    .required("Please select the vision statement.")
    .max(150, "Description must be less than 150 letters."),
  MissionStatement: Yup.string()
    .required("Please select the vision statement.")
    .max(150, "Description must be less than 150 letters."),
  UN_SDG: Yup.string().required("please select the mission statement."),
  AnnualRevenue: Yup.string().required(
    "please select the Average annual revenue."
  ),
  OperatingExpense: Yup.string().required(
    "Please select the Average operating expenses."
  ),
  Currency: Yup.string().required("Please select the currency"),
});

export const StepTwoSchema = Yup.object().shape({
  Website: Yup.string().required("Please enter your company number"),
  ContactEmail: Yup.string()
    .required("Please enter your company number")
    .email("Invalid email format"),
});

export const useUpdateCharityProfile = () => {
  const [updateCharityMetaProfile] = useUpdateCharityMetadataMutation();
  const [addCharityMetaProfile] = useAddCharityMetadataMutation();

  const readFileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);

      reader.onload = () => {
        return resolve(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });

  const saveCharityMetaData = async (
    uuid: any,
    metaData: CharityMetaData,
    logoFile: string,
    bannerFile: string,
    is_create: boolean
  ) => {
    const postData = {
      body: {
        ...metaData,
        Logo: logoFile,
        Banner: bannerFile,
      },
      uuid: uuid,
    };
    let result: any = {};
    if (is_create) {
      const response: any = await addCharityMetaProfile(postData);
      result = response.data ? response : response.error;
    } else {
      const response: any = await updateCharityMetaProfile(postData);
      result = response.data ? response : response.error;
    }
    console.log("result => ", result);
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

  return { saveCharityMetaData, readFileToBase64 };
};
