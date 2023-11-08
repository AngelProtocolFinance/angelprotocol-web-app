import { CreateRecipientRequest } from "types/aws";
import { OptionType } from "types/utils";

export type FormValues = Omit<CreateRecipientRequest, "details"> & {
  requirements: Record<string, string | OptionType<string>>;
};
