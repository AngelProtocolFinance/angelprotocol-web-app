import { ObjectSchema, array, bool, object, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { FileObject } from "types/aws";
import { Country } from "types/countries";
import { OptionType } from "components/Selector";
import { Asset } from "components/registration";
import { genFileSchema } from "schemas/file";
import { requiredString } from "schemas/string";
import { MAX_SDGS } from "constant/unsdgs";

export const MB_LIMIT = 6;
const BYTES_IN_MB = 1e6;

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/webp",
];

const previewsKey: keyof Asset = "previews";
const authorizedToReceiveTaxDeductibleDonationsKey: keyof FormValues =
  "isAuthorizedToReceiveTaxDeductibleDonations";
type TAuthorizedToReceiveTaxDeductibleDonations =
  FormValues["isAuthorizedToReceiveTaxDeductibleDonations"];

function genAssetShape(isRequired: boolean = false): SchemaShape<Asset> {
  return {
    files: array(genFileSchema(MB_LIMIT * BYTES_IN_MB, VALID_MIME_TYPES)).when(
      previewsKey,
      ([previews], schema) =>
        (previews as FileObject[]).length <= 0 && isRequired
          ? schema.min(1, "required")
          : schema
    ),
  };
}

const optionSchema = object<any, SchemaShape<OptionType<string>>>({
  label: requiredString,
  value: requiredString,
});

export const schema = object<any, SchemaShape<FormValues>>({
  proofOfIdentity: object(genAssetShape(true)),
  proofOfRegistration: object(genAssetShape(true)),
  website: string().required("required").url("invalid url"),
  sdgs: array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  hqCountry: object<any, SchemaShape<Country>>({
    name: requiredString,
  }),
  endowDesignation: optionSchema,
  legalEntityType: requiredString,
  //isKYCRequired defaulted to No on default value
  projectDescription: string().when(
    authorizedToReceiveTaxDeductibleDonationsKey,
    ([isAuthorizedToReceiveTaxDeductibleDonations], schema) => {
      return (isAuthorizedToReceiveTaxDeductibleDonations as TAuthorizedToReceiveTaxDeductibleDonations) ===
        "Yes"
        ? schema
        : schema
            .required("required")
            .max(4000, "maximum 4000 characters allowed");
    }
  ),

  hasAuthority: bool().isTrue(
    "Please confirm that you have the authority to create this endowment"
  ),
  hasAgreedToTerms: bool().isTrue(
    "Please confirm that you agree to our Terms and Conditions"
  ),
}) as ObjectSchema<FormValues>;
