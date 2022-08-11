import {
  VaultField,
  VaultFieldIds,
  VaultFieldLimits,
} from "types/shared/withdraw";

export type WithdrawResource = {
  accountAddr: string;
  vaultFields: VaultField[];
  vaultLimits: VaultFieldLimits;
};
export type WithdrawValues = { [key in VaultFieldIds]: string } & {
  beneficiary: string;
  memo?: string;
  total_amount: number;
};
//form meta

export interface WithdrawerProps {
  account_addr: string;
}
