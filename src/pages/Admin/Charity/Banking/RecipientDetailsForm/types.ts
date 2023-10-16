import { CreateRecipientRequest } from "../types";
import { OptionType } from "components/Selector";

export type FormValues = Omit<CreateRecipientRequest, "details" | "type"> & {
  requirements: Record<string, Record<string, string | OptionType<string>>>;
};
