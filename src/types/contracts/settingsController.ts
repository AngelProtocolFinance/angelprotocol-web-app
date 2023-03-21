export type Delegate = {
  address: string; // wallet address like juno1dg2...
  expires?: number; // datetime int of delegation expiry
};

export type SettingsPermissions = {
  owner_controlled: boolean;
  gov_controlled: boolean;
  modifiable: boolean;
  delegate?: Delegate;
};

export type EndowmentController = {
  aum_fee: SettingsPermissions;
  beneficiaries_allowlist: SettingsPermissions;
  categories: SettingsPermissions;
  contributors_allowlist: SettingsPermissions;
  deposit_fee: SettingsPermissions;
  donation_match_active: SettingsPermissions;
  earnings_fee: SettingsPermissions;
  endowment_controller: SettingsPermissions;
  ignore_user_splits: SettingsPermissions;
  image: SettingsPermissions;
  kyc_donors_only: SettingsPermissions;
  logo: SettingsPermissions;
  maturity_allowlist: SettingsPermissions;
  name: SettingsPermissions;
  split_to_liquid: SettingsPermissions;
  withdraw_fee: SettingsPermissions;
};

export type UpdateEndowmentControllerMsg = Partial<EndowmentController> & {
  id: number;
};
