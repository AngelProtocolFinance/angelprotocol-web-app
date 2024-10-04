import type {
  Contact,
  Init,
  ReferralMethod,
  Role,
} from "@better-giving/registration/models";
import type { OverrideProperties } from "type-fest";
import type { OptionType } from "types/components";

export type FormValues = OverrideProperties<
  Contact & Pick<Init, "registrant_id" | "id">,
  {
    org_role: OptionType<Role>;
    referral_method: OptionType<ReferralMethod>;
  }
>;
