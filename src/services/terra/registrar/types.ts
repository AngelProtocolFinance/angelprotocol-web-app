import { FundDetails } from "contracts/types";

export type EndowmentStatus = {
  Inactive: 0;
  Approved: 1;
  Frozen: 2;
  Closed: 3;
};

export type EndowmentStatusNum = EndowmentStatus[keyof EndowmentStatus];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;
export type EndowmentType = "charity";

export type EndowmentListRes = {
  endowments: EndowmentEntry[];
};
export type EndowmentTier = "Level1" | "Level2" | "Level3";
export type EndowmentEntry = {
  address: string;
  status: keyof EndowmentStatus;
  name: string;
  owner?: string;
  tier?: EndowmentTier;
  endow_type?: EndowmentType;
  un_sdg?: number;
};

export type CategorizedEndowments = {
  [index: number]: EndowmentEntry[];
};

export type EndowmentQueryOptions = {
  name?: string;
  owner?: string;
  status?: EndowmentStatusStrNum;
  tier?: EndowmentTier;
  endow_type?: EndowmentType;
};

export interface EndowmentQueryMsg {
  address: string;
  msg: {
    endowment_list: EndowmentQueryOptions;
  };
}

export type FundListRes = {
  funds: FundDetails[];
};

export type RegistrarConfig = {
  owner: string;
  guardians_multisig_addr?: string;
  endowment_owners_group_addr?: string;
  version: string;
  accounts_code_id: number;
  treasury: string;
  tax_rate: string; //decimal string
  default_vault?: string;
  index_fund?: string;
  split_to_liquid: { min: string; max: string; default: string };
  halo_token?: string;
  gov_contract?: string;
  charity_shares_contract?: string;
};

export type VaultRateInfo = {
  vault_addr: string; //"terra172u..
  fx_rate: string; //"1.206784043460040765"
};

export type VaultsRateRes = {
  vaults_rate: VaultRateInfo[];
};
