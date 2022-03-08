import { FundDetails } from "contracts/types";

export type Any = any;

export type EndowmentStatus = {
  Inactive: 0;
  Approved: 1;
  Frozen: 2;
  Closed: 3;
};

export type EndowmentStatusNum = EndowmentStatus[keyof EndowmentStatus];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;

export type EndowmentListRes = {
  endowments: EndowmentEntry[];
};
export type EndowmentEntry = {
  address: string;
  status: keyof EndowmentStatus;
};

export type FundListRes = {
  funds: FundDetails[];
};

export type VaultRateInfo = {
  vault_addr: string; //"terra172u..
  fx_rate: string; //"1.206784043460040765"
};

export type VaultsRateRes = {
  vaults_rate: VaultRateInfo[];
};
