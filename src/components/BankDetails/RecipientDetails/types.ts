import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset, OptionType } from "types/components";
import { Country } from "types/components";

export type FormValues = Omit<
  CreateRecipientRequest,
  "details" | "ownedByCustomer" | "profile"
> & {
  bankStatementFile: FileDropzoneAsset;
  requirements: Record<string, null | string | OptionType<string> | Country>;
};
