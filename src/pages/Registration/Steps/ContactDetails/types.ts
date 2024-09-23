import type { OverrideProperties } from "type-fest";
import type { ContactRoles, ReferralMethods, RegV2 } from "types/aws";
import type { OptionType } from "types/components";

export type FormValues = OverrideProperties<
  RegV2.Contact & Pick<RegV2.Init, "registrant_id" | "id">,
  {
    org_role: OptionType<ContactRoles>;
    referral_method: OptionType<ReferralMethods>;
  }
>;
