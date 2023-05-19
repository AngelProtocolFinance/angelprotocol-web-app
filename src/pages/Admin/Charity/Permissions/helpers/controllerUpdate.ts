import { SettingsController, SettingsControllerUpdate } from "types/contracts";
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
    endowmentController: controller.endowmentController,
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
}

const converter =
  //no need to check against initial values as `fv` is initialized with SettingsConroller
  (fv: UpdateableFormValues) => (permission: keyof UpdateableFormValues) => {
    const val = fv[permission];
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
