import { OptionType } from "@ap/components/selector";
import { ContactPerson } from "../../types";
import { ContactRoles, ReferralMethods } from "@ap/types/aws";

export type FormValues = Omit<ContactPerson, "role" | "referralMethod"> & {
  role: OptionType<ContactRoles>;
  referralMethod: OptionType<ReferralMethods>;
  ref: string;
};
