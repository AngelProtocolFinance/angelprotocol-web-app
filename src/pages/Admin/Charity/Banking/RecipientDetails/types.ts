import { CreateRecipientRequest } from "types/aws";
import { Country } from "types/countries";
import { OptionType } from "types/utils";
import { Asset } from "components/registration";

export type FormValues = Omit<CreateRecipientRequest, "details"> & {
  bankStatementPDF: Asset;
  requirements: Record<string, string | OptionType<string> | Country>;
};
