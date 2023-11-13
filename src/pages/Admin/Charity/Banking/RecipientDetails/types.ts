import { CreateRecipientRequest } from "types/aws";
import { OptionType } from "types/components";
import { Country } from "types/components";
import { Asset } from "components/FileDropzone";

export type FormValues = Omit<CreateRecipientRequest, "details"> & {
  bankStatementPDF: Asset;
  requirements: Record<string, string | OptionType<string> | Country>;
};
