import { FormValues } from "../types";
import { CreateRecipientRequest } from "types/aws";
import { redot } from "../helpers/dot";

export default function formToCreateRecipientRequest(
  formValues: Omit<FormValues, "bankStatementFile">
): CreateRecipientRequest {
  return {
    accountHolderName: formValues.accountHolderName,
    currency: formValues.currency,
    type: formValues.type,
    details: Object.entries(formValues.requirements).reduce<
      CreateRecipientRequest["details"]
    >((details, [key, value]) => {
      const origKey = redot(key);
      if (typeof value === "string") {
        // if value is string
        details[origKey] = value;
      } else if ("code" in value) {
        // if value is Country
        details[origKey] = value.code;
      } else {
        // if value is OptionType
        details[origKey] = value.value;
      }
      return details;
    }, {}),
  };
}
