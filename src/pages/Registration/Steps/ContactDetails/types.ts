import { ContactPerson } from "../../types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "components/registration";

export type FormValues = Omit<ContactPerson, "role" | "referralMethod"> & {
  role: OptionType<ContactRoles>;
  referralMethod: OptionType<ReferralMethods>;
  ref: string;
};
