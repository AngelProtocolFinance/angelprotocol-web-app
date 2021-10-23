import { useUpdateCharityMetadataMutation } from "api/charityAPIs";
import * as Yup from "yup";

export type CharityMetaData = {
  CompanyNumber?: string;
  CountryIncorporation?: string;
  IsYourCountry?: boolean;
  SelectCountries?: string[];
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
  SelectCountries: Yup.array().required(`Please select the countries.`),
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

export const StepTwoSchema = Yup.object().shape({});

export const useUpdateCharityProfile = () => {
  const [updateCharityProfile] = useUpdateCharityMetadataMutation();
};
