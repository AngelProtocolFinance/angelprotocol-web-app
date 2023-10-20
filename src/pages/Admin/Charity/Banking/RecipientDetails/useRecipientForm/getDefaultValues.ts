import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import { OptionType } from "components/Selector";
import { undot } from "../dot";

export default function getDefaultValues(
  accountRequirements: AccountRequirements,
  targetCurrency: string
): FormValues {
  return {
    currency: targetCurrency,
    accountHolderName: "ENDOWMENT_NAME",
    type: accountRequirements.type,
    requirements: accountRequirements.fields.map((field) => {
      const requirements = field.group[0];

      const key = undot(requirements.key);

      const value: string | OptionType<string> =
        requirements.type === "text" || requirements.type === "date"
          ? ""
          : {
              // this field contains dropdown placeholder text for `type === select`; for `type === radio` it's empty string
              label: requirements.example,
              value: "",
            };

      return { [key]: value };
    }),
  };
}
