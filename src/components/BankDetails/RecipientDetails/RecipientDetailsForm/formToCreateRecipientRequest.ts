import { FormValues } from "../types";
import { CreateRecipientRequest } from "types/aws";
import { redot } from "../helpers/dot";

export default function formToCreateRecipientRequest(
  formValues: Omit<FormValues, "bankStatementFile">
): CreateRecipientRequest {
  const { accountHolderName, ...requirements } = formValues.requirements;

  return {
    accountHolderName: accountHolderName as string,
    currency: formValues.currency,
    type: formValues.type,
    ownedByCustomer: false,
    profile: "{{profileId}}", // AWS replaces it with actual Profile ID
    details: Object.entries(requirements).reduce<
      CreateRecipientRequest["details"]
    >(
      (details, [key, value]) => {
        if (value == null) {
          // if value is null/undefined, it's probably optional,
          // so don't include it
          return details;
        }

        const origKey = redot(key);

        let objToFill = details;
        let field = origKey;

        if (origKey.startsWith("address.")) {
          objToFill = details["address"] as Record<string, string>; // address object
          field = origKey.split(".")[1]; // address field
        }

        // if value is string
        if (typeof value === "string") {
          fill(objToFill, field, value);
        } else if ("code" in value) {
          // if value is Country
          fill(objToFill, field, value.code);
        } else {
          // if value is OptionType
          fill(objToFill, field, value.value);
        }
        return details;
      },
      { address: {} }
    ),
  };
}

function fill(
  obj: Record<string, any>,
  field: string,
  value: string | null | undefined
) {
  obj[field] = value;
}
