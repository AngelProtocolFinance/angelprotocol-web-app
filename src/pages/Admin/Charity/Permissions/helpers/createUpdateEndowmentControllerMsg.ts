import {
  Delegate,
  SettingsController,
  SettingsControllerUpdate,
} from "types/contracts";
import { ADDRESS_ZERO } from "constants/evm";
import { UpdateableFormValues } from "../schema";

export function createUpdateEndowmentControllerMsg(
  endowId: number,
  changes: Partial<UpdateableFormValues>,
  initial: SettingsController
): SettingsControllerUpdate {
  const toPermission = converter(changes);
  const accountFees = toPermission("accountFees", initial.depositFee);
  const beneficiaries_allowlist = toPermission(
    "beneficiaries_allowlist",
    initial.allowlistedBeneficiaries
  );
  const contributors_allowlist = toPermission(
    "contributors_allowlist",
    initial.allowlistedContributors
  );
  const donationSplitParams = toPermission(
    "donationSplitParams",
    initial.splitToLiquid
  );
  const profile = toPermission("profile", initial.image);

  const updateMsg: SettingsControllerUpdate = {
    id: endowId,
    settingsController: {
      strategies: initial.strategies,
      allowlistedBeneficiaries: beneficiaries_allowlist,
      allowlistedContributors: contributors_allowlist,
      maturityAllowlist: initial.maturityAllowlist,
      maturityTime: initial.maturityTime,
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

  return updateMsg;
}

const converter =
  (changes: Partial<UpdateableFormValues>) =>
  (permission: keyof UpdateableFormValues, initial: Delegate): Delegate => {
    const val = changes[permission];
    if (!val) return initial;
    return {
      addr: val.isActive ? val.addr : ADDRESS_ZERO,
      expires: 0, //in design: no expiry for delegation,
    };
  };
