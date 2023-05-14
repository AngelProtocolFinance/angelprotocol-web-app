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
  const toPermission = converter(changes);

  const accountFees = toPermission("accountFees", initial.aumFee);
  const beneficiaries_allowlist = toPermission(
    "beneficiaries_allowlist",
    initial.whitelistedBeneficiaries
  );
  const contributors_allowlist = toPermission(
    "contributors_allowlist",
    initial.whitelistedContributors
  );
  const donationSplitParams = toPermission(
    "donationSplitParams",
    initial.splitToLiquid
  );
  const profile = toPermission("profile", initial.profile);

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

const converter =
  (changes: Partial<UpdateableFormValues>) =>
  (permission: keyof UpdateableFormValues, initial: SettingsPermission) => {
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
  };
