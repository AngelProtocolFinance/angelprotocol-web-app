import { FieldErrors } from "react-hook-form";
import { getTypedKeys } from "helpers";
import { FormField, FormValues } from "../schema";

// this object is created only to be able to iterate over `FormField` keys
const formFieldSample: FormField = {
  addr: "",
  isActive: false,
  govControlled: false,
  modifiableAfterInit: false,
  name: "",
  ownerControlled: false,
};

export function getFieldErrorName(
  errors: FieldErrors<FormValues>
): string | undefined {
  const errorKey = getTypedKeys(errors).find((errKey) => !!errors[errKey]);

  // shouldn't be any of the below, but have the check to narrow down the key type
  if (!errorKey || errorKey === "initial" || errorKey === "root") {
    return errorKey;
  }

  // `errors[errorKey]` is defined due to check above
  const errorSubKey = getTypedKeys(formFieldSample).find(
    (errKey) => !!errors[errorKey]![errKey]
  );

  if (errorSubKey) {
    return `${errorKey}.${errorSubKey}`;
  }
}
