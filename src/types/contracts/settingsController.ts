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
  endowment_controller: SettingsPermissions;
  name: SettingsPermissions;
  image: SettingsPermissions;
  logo: SettingsPermissions;
  categories: SettingsPermissions;
  kyc_donors_only: SettingsPermissions;
  split_to_liquid: SettingsPermissions;
  ignore_user_splits: SettingsPermissions;
  donation_match_active: SettingsPermissions;
  beneficiaries_allowlist: SettingsPermissions;
  contributors_allowlist: SettingsPermissions;
  maturity_allowlist: SettingsPermissions;
  earnings_fee: SettingsPermissions;
  deposit_fee: SettingsPermissions;
  withdraw_fee: SettingsPermissions;
  aum_fee: SettingsPermissions;
};

export type UpdateEndowmentControllerMsg = Partial<EndowmentController> & {
  id: number;
};
