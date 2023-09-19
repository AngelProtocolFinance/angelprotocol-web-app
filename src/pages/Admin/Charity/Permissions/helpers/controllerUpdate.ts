import { TPermissions } from "../types";
import {
  SettingsController,
  SettingsControllerUpdate,
  SettingsPermission,
} from "types/contracts";
import { blockTime } from "helpers/admin";
import { ADDRESS_ZERO } from "constant/evm";

export function controllerUpdate(
  endowId: number,
  permissions: TPermissions,
  controller: SettingsController
): SettingsControllerUpdate {
  const toPermission = converter(permissions);
  const accountFees = toPermission("accountFees");
  const beneficiaryAllowlist = toPermission("beneficiaryAllowlist");
  const contributorAllowlist = toPermission("contributorAllowlist");
  const maturityAllowlist = toPermission("maturityAllowlist");
  const maturityTime = toPermission("maturityTime");
  const donationSplitParams = toPermission("donationSplitParams");
  const profile = toPermission("profile");

  return {
    id: endowId,
    settingsController: {
      acceptedTokens: controller.acceptedTokens,
      lockedInvestmentManagement: controller.lockedInvestmentManagement,
      liquidInvestmentManagement: controller.liquidInvestmentManagement,
      allowlistedBeneficiaries: beneficiaryAllowlist,
      allowlistedContributors: contributorAllowlist,
      maturityAllowlist: maturityAllowlist,
      maturityTime: maturityTime,
      earlyLockedWithdrawFee: accountFees,
      withdrawFee: accountFees,
      depositFee: accountFees,
      balanceFee: accountFees,
      name: profile,
      image: profile,
      logo: profile,
      sdgs: profile,
      splitToLiquid: donationSplitParams,
      ignoreUserSplits: donationSplitParams,
    },
  };
}

//no need to check against initial values as `fv` is initialized with SettingsConroller

const converter =
  (permissions: TPermissions) =>
  (permission: keyof TPermissions): SettingsPermission => {
    const val = permissions[permission];
    return {
      locked: val.locked,
      delegate: {
        addr: val.delegated ? val.addr : ADDRESS_ZERO,
        expires: val.expires ? blockTime(val.expiry) : 0,
      },
    };
  };
