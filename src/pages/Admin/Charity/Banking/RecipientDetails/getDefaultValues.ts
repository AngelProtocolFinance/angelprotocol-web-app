import { FormValues } from "./types";
import { AccountRequirements } from "types/aws";
import { Country } from "types/countries";
import { genFileAsset } from "pages/Registration/Steps/getRegistrationState";
import { isCountry, isTextType, undot } from "./helpers";

export default function getDefaultValues(
  accountRequirements: AccountRequirements,
  targetCurrency: string
): FormValues {
  return {
    accountHolderName: "ENDOWMENT_NAME",
    bankStatementPDF: genFileAsset([]),
    currency: targetCurrency,
    type: accountRequirements.type,
    requirements: accountRequirements.fields.reduce<FormValues["requirements"]>(
      (defaultValues, field) => {
        field.group.forEach((requirements) => {
          const key = undot(requirements.key);

          if (isTextType(requirements)) {
            defaultValues[key] = "";
          } else if (isCountry(requirements)) {
            const country: Country = { code: "", flag: "", name: "" };
            defaultValues[key] = country;
          } else {
            defaultValues[key] = {
              // `requirements.example` contains dropdown placeholder text for `select`; for `radio` it's empty string
              label: requirements.example || "Select...",
              value: "",
            };
          }
        });

        return defaultValues;
      },
      {}
    ),
  };
}
