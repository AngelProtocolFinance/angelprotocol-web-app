import { OptionType } from "@giving/components/Selector";
import { ContactPerson } from "../../types";
import { ContactRoles, ReferralMethods } from "@giving/types/aws";

export type FormValues = Omit<ContactPerson, "role" | "referralMethod"> & {
  role: OptionType<ContactRoles>;
  referralMethod: OptionType<ReferralMethods>;
  ref: string;
};
