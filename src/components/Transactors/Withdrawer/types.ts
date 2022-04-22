import {
  VaultField,
  VaultFieldIds,
  VaultFieldLimits,
} from "types/shared/widthdraw";

type WithdrawMeta = { total_ust: number; total_receive: number };
export type WithdrawResource = {
  accountAddr: string;
  vaultFields: VaultField[];
  vaultLimits: VaultFieldLimits;
};
export type WithdrawValues = { [key in VaultFieldIds]: string } & {
  beneficiary: string;
  memo?: string;
} & WithdrawMeta;
//form meta

export interface WithdrawerProps {
  account_addr: string;
}
