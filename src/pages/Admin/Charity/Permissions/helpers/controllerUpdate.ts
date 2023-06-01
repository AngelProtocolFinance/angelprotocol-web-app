import {
  SettingsController,
  SettingsControllerUpdate,
  SettingsPermission,
} from "types/contracts";
import { ADDRESS_ZERO } from "constants/evm";
import { UpdateableFormValues } from "../schema";

export function controllerUpdate(
  endowId: number,
  fv: UpdateableFormValues,
  controller: SettingsController
): SettingsControllerUpdate {
  const toPermission = converter(fv);
  const accountFees = toPermission("accountFees");
  const beneficiaries_allowlist = toPermission("beneficiaries_allowlist");
  const contributors_allowlist = toPermission("contributors_allowlist");
  const donationSplitParams = toPermission("donationSplitParams");
  const profile = toPermission("profile");

  return {
    id: endowId,
    settingsController: {
      acceptedTokens: controller.acceptedTokens,
      lockedInvestmentManagement: controller.lockedInvestmentManagement,
      liquidInvestmentManagement: controller.liquidInvestmentManagement,
      allowlistedBeneficiaries: beneficiaries_allowlist,
      allowlistedContributors: contributors_allowlist,
      maturityAllowlist: controller.maturityAllowlist,
      maturityTime: controller.maturityTime,
      earlyLockedWithdrawFee: accountFees,
      withdrawFee: accountFees,
      depositFee: accountFees,
      balanceFee: accountFees,
      name: profile,
      image: profile,
      logo: profile,
      categories: profile,
      splitToLiquid: donationSplitParams,
      ignoreUserSplits: donationSplitParams,
    },
  };
}

//no need to check against initial values as `fv` is initialized with SettingsConroller

const converter =
  (fv: UpdateableFormValues) =>
  (permission: keyof UpdateableFormValues): SettingsPermission => {
    const val = fv[permission];
    return {
      locked: val.locked,
      delegate: {
        addr: val.isActive ? val.addr : ADDRESS_ZERO,
        expires: 0, //in design: no expiry for delegation,
      },
    };
  };
