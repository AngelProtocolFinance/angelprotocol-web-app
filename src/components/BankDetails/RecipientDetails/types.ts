import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset, OptionType } from "types/components";
import { Country } from "types/components";

export type FormValues = Omit<
  CreateRecipientRequest,
  // `details` values are simple strings, so swap that out for what a form needs
  | "details"
  // have default values, see formToCreateRecipientRequest.ts
  | "ownedByCustomer"
  | "profile"
  // even though the field falls outside the `details` object, it is nevertheless
  // returned as part of the requirements array from Wise
  | "accountHolderName"
> & {
  bankStatementFile: FileDropzoneAsset;
  requirements: Record<string, null | string | OptionType<string> | Country>;
};
