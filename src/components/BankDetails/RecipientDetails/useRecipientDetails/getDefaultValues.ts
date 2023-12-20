import { FormValues } from "../types";
import { AccountRequirements, Field, Group } from "types/aws";
import { Country } from "types/components";
import { asset } from "components/FileDropzone";
import { Currency } from "../../../CurrencySelector";
import { isCountry, isTextType, undot } from "../helpers";

/**
 * Creates a FormValues object based on the passed requirements,
 * with all fields set to appropriate default values.
 *
 * @param accountRequirements requirements to process
 * @param currency target currency
 * @returns FormValues object with all fields set to appropriate default values
 */
export function getDefaultValues(
  accountRequirements: AccountRequirements,
  currency: Currency
): FormValues {
  return {
    bankStatementFile: asset([]),
    currency: currency.code,
    type: accountRequirements.type,
    requirements: accountRequirements.fields.reduce<FormValues["requirements"]>(
      (defaultValues, field) => {
        const updated = populateRequirementField(defaultValues, field);
        return updated;
      },
      {}
    ),
  };
}

/**
 * Adds a requirement field (set to default value depending on type) to current form requirements.
 *
 * @param currFormValues current form requirements
 * @param field requirement field to add
 * @returns current form requirements with the new req. field added
 */
function populateRequirementField(
  currFormValues: FormValues["requirements"],
  field: Field
): FormValues["requirements"] {
  const result = field.group.reduce(
    (curr, group) => populateRequirementGroup(curr, group),
    { ...currFormValues }
  );

  return result;
}

/**
 * Adds a requirement group (set to default value depending on type) to current form requirements.
 *
 * @param currFormValues current form requirements
 * @param group requirement group to add
 * @returns current form requirements with the new req. group added
 */
export function populateRequirementGroup(
  currFormValues: FormValues["requirements"],
  group: Group
): FormValues["requirements"] {
  const updated = { ...currFormValues };

  const key = undot(group.key);

  if (isTextType(group)) {
    updated[key] = null;
  } else if (isCountry(group)) {
    const country: Country = { code: "", flag: "", name: "" };
    updated[key] = country;
  } else {
    updated[key] = {
      // `requirements.example` contains dropdown placeholder text for `select`; for `radio` it's empty string
      label: group.example || "Select...",
      value: "",
    };
  }

  return updated;
}
