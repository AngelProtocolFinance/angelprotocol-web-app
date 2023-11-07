import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset, OptionType } from "types/components";
import { Country } from "types/components";

export type FormValues = Omit<CreateRecipientRequest, "details"> & {
  bankStatementPDF: FileDropzoneAsset;
  requirements: Record<string, string | OptionType<string> | Country>;
};
