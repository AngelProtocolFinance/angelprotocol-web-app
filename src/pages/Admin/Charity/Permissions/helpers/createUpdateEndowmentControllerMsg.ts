import {
  SettingsController,
  SettingsControllerUpdate,
  SettingsPermission,
} from "types/contracts";
import { ADDRESS_ZERO } from "constants/evm";
import { UpdateableFormValues } from "../schema";

export function createUpdateEndowmentControllerMsg(
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
    endowmentController: initial.endowmentController,
    name: profile,
    image: profile,
    logo: profile,
    categories: profile,
    kycDonorsOnly: profile,
    splitToLiquid: donationSplitParams,
    ignoreUserSplits: donationSplitParams,
    whitelistedBeneficiaries: beneficiaries_allowlist,
    whitelistedContributors: contributors_allowlist,
    maturityWhitelist: beneficiaries_allowlist,
    earningsFee: accountFees,
    depositFee: accountFees,
    withdrawFee: accountFees,
    aumFee: accountFees,
  };

  return updateMsg;
}

function toPermission(
  permission: keyof UpdateableFormValues,
  changes: Partial<UpdateableFormValues>,
  initial: SettingsPermission
): SettingsPermission {
  const val = changes[permission];
  if (!val)
    return {
      ...initial,
      delegate: {
        Addr: ADDRESS_ZERO,
        expires: 0,
      },
    };

  return {
    ownerControlled: val.ownerControlled,
    govControlled: val.govControlled,
    modifiableAfterInit: val.modifiableAfterInit,
    delegate: {
      Addr: val.delegated ? val.delegate_address : ADDRESS_ZERO,
      expires: 0, //in design: no expiry for delegation,
    },
  };
}
