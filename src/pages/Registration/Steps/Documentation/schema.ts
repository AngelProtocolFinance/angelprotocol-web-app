import { ObjectSchema, array, object, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { Country } from "types/countries";
import { genAssetShape } from "schemas/file";
import { optionType } from "schemas/shape";
import { requiredString } from "schemas/string";
import { MAX_SDGS } from "constants/unsdgs";

const authorizedToReceiveTaxDeductibleDonationsKey: keyof FormValues =
  "isAuthorizedToReceiveTaxDeductibleDonations";
type TAuthorizedToReceiveTaxDeductibleDonations =
  FormValues["isAuthorizedToReceiveTaxDeductibleDonations"];

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
  endowDesignation: optionType({ required: true }),
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
}) as ObjectSchema<FormValues>;
