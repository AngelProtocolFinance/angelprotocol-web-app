import { CreateRecipientRequest } from "types/aws";
import { OptionType } from "components/Selector";

export type FormValues = Omit<CreateRecipientRequest, "details"> & {
  requirements: Record<string, string | OptionType<string>>;
};
