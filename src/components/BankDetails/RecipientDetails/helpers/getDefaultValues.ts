import { FormValues } from "../types";
import { AccountRequirements, Field, Group } from "types/aws";
import { Country } from "types/components";
import { asset } from "components/FileDropzone";
import { isCountry, isTextType, undot } from ".";

export function getDefaultValues(
  accountRequirements: AccountRequirements,
  targetCurrency: string
): FormValues {
  return {
    bankStatementFile: asset([]),
    currency: targetCurrency,
    type: accountRequirements.type,
    requirements: accountRequirements.fields.reduce<FormValues["requirements"]>(
      (defaultValues, field) => {
        const updated = updateDefaultValues(field, defaultValues);
        return updated;
      },
      {}
    ),
  };
}

function updateDefaultValues(
  field: Field,
  defaultValues: FormValues["requirements"]
): FormValues["requirements"] {
  const result = field.group.reduce(
    (curr, requirements) => updateReqField(curr, requirements),
    { ...defaultValues }
  );

  return result;
}

export function updateReqField(
  curr: FormValues["requirements"],
  requirements: Group
): FormValues["requirements"] {
  const updated = { ...curr };

  const key = undot(requirements.key);

  if (isTextType(requirements)) {
    updated[key] = null;
  } else if (isCountry(requirements)) {
    const country: Country = { code: "", flag: "", name: "" };
    updated[key] = country;
  } else {
    updated[key] = {
      // `requirements.example` contains dropdown placeholder text for `select`; for `radio` it's empty string
      label: requirements.example || "Select...",
      value: "",
    };
  }

  return updated;
}
