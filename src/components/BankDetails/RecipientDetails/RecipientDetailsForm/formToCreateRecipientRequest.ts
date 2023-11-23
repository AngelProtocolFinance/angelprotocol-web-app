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

        // `address` is the only required field always present in `details` object
        // see https://docs.wise.com/api-docs/api-reference/recipient#object
        if (origKey.startsWith("address.")) {
          objToFill = details["address"] as Record<string, string>; // address object
          field = origKey.split(".")[1]; // address field
        }

        if (typeof value === "string") {
          // if value is string
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

/**
 * Since Country matches `Record<string, string>`, it would be possible to (by mistake) assign
 * a whole `country: Country` to any of the appropriate `CreateRecipientRequest.details`
 * object fields.
 * By using a function that forces the assignment of a `string` value, we avoid this potential
 * developer mistake.
 *
 * const value: Country = {...};
 * objToFill[field] = value; // no compilation error
 * ---
 * const value: Country = {...};
 * fill(objToFill, field, value); // ERROR
 * fill(objToFill, field, value.code); // all good
 *
 * @param obj object to update
 * @param key object key to update
 * @param value string value to use
 */
function fill(
  obj: Record<string, string | Record<string, string> | undefined>,
  key: string,
  value: string
) {
  obj[key] = value;
}
