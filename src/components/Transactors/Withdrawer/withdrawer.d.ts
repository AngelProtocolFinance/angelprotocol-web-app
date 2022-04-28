declare module "@types-component/withdrawer" {
  import {
    VaultField,
    VaultFieldIds,
    VaultFieldLimits,
  } from "@types-shared/withdraw";

  type WithdrawMeta = { total_ust: number; total_receive: number };
  type WithdrawResource = {
    accountAddr: string;
    vaultFields: VaultField[];
    vaultLimits: VaultFieldLimits;
  };
  type WithdrawValues = { [key in VaultFieldIds]: string } & {
    beneficiary: string;
    memo?: string;
  } & WithdrawMeta;
  //form meta

  interface WithdrawerProps {
    account_addr: string;
  }
}
