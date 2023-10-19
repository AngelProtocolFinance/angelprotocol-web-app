import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import { undot } from "../dot";

export default function getDefaultValues(
  accountRequirements: AccountRequirements[]
): FormValues["requirements"] {
  return accountRequirements.reduce(
    (defaultValues, curRequirements) => {
      defaultValues[curRequirements.type] = curRequirements.fields.reduce(
        (objectShape, field) => {
          const requirements = field.group[0];

          const key = undot(requirements.key);

          if (requirements.type === "text" || requirements.type === "date") {
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
