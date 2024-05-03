import type { OverrideProperties } from "type-fest";
import type {
  ContactDetails,
  ContactRoles,
  InitContact,
  OrgDataForStep1,
  ReferralMethods,
} from "types/aws";
import type { OptionType } from "types/components";

export type FormValues = OverrideProperties<
  ContactDetails & OrgDataForStep1,
  {
    Role: OptionType<ContactRoles>;
    ReferralMethod: OptionType<ReferralMethods>;
  }
> &
  Pick<InitContact, "Email" | "PK">;
