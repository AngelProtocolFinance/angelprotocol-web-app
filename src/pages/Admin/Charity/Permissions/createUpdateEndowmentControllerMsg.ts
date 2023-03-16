import {
  SettingsPermissions,
  UpdateEndowmentControllerMsg,
} from "types/contracts";
import { FormField, UpdateableFormValues } from "./schema";

export default function createUpdateEndowmentControllerMsg(
  endowId: number,
  formValues: Partial<UpdateableFormValues>
): UpdateEndowmentControllerMsg {
  const accountFees = createField(formValues.accountFees);
  const beneficiaries_allowlist = createField(formValues.accountFees);
  const donationSplitParams = createField(formValues.donationSplitParams);
  const profile = createField(formValues.profile);
  const contributors_allowlist = createField(formValues.contributors_allowlist);

  const updateMsg: UpdateEndowmentControllerMsg = {
    id: endowId,
    aum_fee: accountFees,
    beneficiaries_allowlist,
    categories: profile,
    contributors_allowlist,
    deposit_fee: accountFees,
    earnings_fee: accountFees,
    ignore_user_splits: donationSplitParams,
    image: profile,
    kyc_donors_only: profile,
    logo: profile,
    maturity_allowlist: beneficiaries_allowlist,
    name: profile,
    split_to_liquid: donationSplitParams,
    withdraw_fee: accountFees,
  };
  return updateMsg;
}

function createField(formField?: FormField): SettingsPermissions | undefined {
  if (!formField) {
    return undefined;
  }

  const result: SettingsPermissions = {
    gov_controlled: formField.gov_controlled,
    modifiable: formField.modifiable,
    owner_controlled: formField.owner_controlled,
  };

  if (formField.delegate) {
    result.delegate = { address: formField.delegate_address };
  }

  return result;
}
