import { AccountRequirements } from "../../types";
import { FormValues } from "../types";

export default function getDefaultValues(
  accountRequirements: AccountRequirements[]
): FormValues["requirements"] {
  return accountRequirements.reduce(
    (defaultValues, curRequirements) => {
      defaultValues[curRequirements.type] = curRequirements.fields.reduce(
        (objectShape, field) => {
          const requirements = field.group[0];

          // `react-hook-form` turns dot-fields into nested objects, causing weird behavior.
          // To solve, turn dots into some other character https://github.com/react-hook-form/react-hook-form/issues/3755#issuecomment-943408807
          const key = requirements.key.replace(".", "__");

          if (requirements.type === "text") {
            objectShape[key] = "";
          } else {
            objectShape[key] = {
              label: requirements.example, // this field contains dropdown placeholder text for `select`; for `radio` it's empty string
              value: "",
            };
          }

          return objectShape;
        },
        {} as FormValues["requirements"][""]
      );
      return defaultValues;
    },
    {} as FormValues["requirements"]
  );
}
