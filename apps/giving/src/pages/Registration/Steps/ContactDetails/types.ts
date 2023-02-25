import { ContactPerson } from "../../types";
import { ContactRoles, ReferralMethods } from "@giving/types/aws";
import { OptionType } from "components/Selector";

export type FormValues = Omit<ContactPerson, "role" | "referralMethod"> & {
  role: OptionType<ContactRoles>;
  referralMethod: OptionType<ReferralMethods>;
  ref: string;
};
