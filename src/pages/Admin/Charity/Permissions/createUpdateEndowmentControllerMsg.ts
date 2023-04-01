import {
  SettingsController,
  SettingsControllerUpdate,
  SettingsPermission,
} from "types/contracts";
import { ADDRESS_ZERO } from "constants/evm";
import { UpdateableFormValues } from "./schema";

export default function createUpdateEndowmentControllerMsg(
  endowId: number,
  changes: Partial<UpdateableFormValues>,
  initial: SettingsController
): SettingsControllerUpdate {
  const accountFees = toPermission("accountFees", changes, initial.aumFee);
  const beneficiaries_allowlist = toPermission(
    "beneficiaries_allowlist",
    changes,
    initial.whitelistedBeneficiaries
  );
  const contributors_allowlist = toPermission(
    "contributors_allowlist",
    changes,
    initial.whitelistedContributors
  );
  const donationSplitParams = toPermission(
    "donationSplitParams",
    changes,
    initial.splitToLiquid
  );
  const profile = toPermission("profile", changes, initial.profile);

  const updateMsg: SettingsControllerUpdate = {
    id: endowId,
    aumFee: accountFees,
    whitelistedBeneficiaries: beneficiaries_allowlist,
    categories: profile,
    whitelistedContributors: contributors_allowlist,
    depositFee: accountFees,
    earningsFee: accountFees,
    ignoreUserSplits: donationSplitParams,
    image: profile,
    kycDonorsOnly: profile,
    logo: profile,
    maturityWhitelist: beneficiaries_allowlist,
    name: profile,
    splitToLiquid: donationSplitParams,
    withdrawFee: accountFees,
    endowmentController: initial.endowmentController,
    profile: initial.profile,
    maturityTime: initial.maturityTime,
    strategies: initial.strategies,
  };
  return updateMsg;
}

function toPermission(
  permission: keyof UpdateableFormValues,
  changes: Partial<UpdateableFormValues>,
  initial: SettingsPermission
): SettingsPermission {
  const val = changes[permission];
  if (!val) return initial;

  return {
    govControlled: val.govControlled,
    modifiableAfterInit: val.modifiableAfterInit,
    ownerControlled: val.ownerControlled,
    delegate: {
      Addr: val.delegate_address ? val.delegate_address : ADDRESS_ZERO,
      expires: 0, //in design: no expiry for delegation,
    },
  };
}
