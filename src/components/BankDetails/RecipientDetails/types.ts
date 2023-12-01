import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { Country, FileDropzoneAsset, OptionType } from "types/components";

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

export type RequirementsData = {
  active: boolean;
  accountRequirements: AccountRequirements;
  currentFormValues: FormValues;
  refreshedRequirementsAdded: boolean;
  /**
   * Indicates whether requirements refresh is necessary.
   * See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
   */
  refreshRequired: boolean;
};
