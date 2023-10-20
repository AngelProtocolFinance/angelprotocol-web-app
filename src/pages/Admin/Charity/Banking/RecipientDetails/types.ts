import { CreateRecipientRequest } from "../types";
import { OptionType } from "components/Selector";

export type FormValues = Omit<CreateRecipientRequest, "details"> & {
  requirements: { [key: string]: string | OptionType<string> }[];
};
