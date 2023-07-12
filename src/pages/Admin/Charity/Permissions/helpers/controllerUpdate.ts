import { TPermissions } from "../types";
import {
  SettingsController,
  SettingsControllerUpdate,
  SettingsPermission,
} from "types/contracts";
import { blockTime } from "helpers/admin";
import { ADDRESS_ZERO } from "constants/evm";

export function controllerUpdate(
  endowId: number,
  permissions: TPermissions,
  controller: SettingsController
): SettingsControllerUpdate {
  const toPermission = converter(permissions);
  const accountFees = toPermission("accountFees");
  const allowList = toPermission("allowList");
  const donationSplitParams = toPermission("donationSplitParams");
  const profile = toPermission("profile");

  return {
    id: endowId,
    settingsController: {
      acceptedTokens: controller.acceptedTokens,
      lockedInvestmentManagement: controller.lockedInvestmentManagement,
      liquidInvestmentManagement: controller.liquidInvestmentManagement,
      allowlistedBeneficiaries: allowList,
      allowlistedContributors: allowList,
      maturityAllowlist: controller.maturityAllowlist,
      maturityTime: controller.maturityTime,
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
