import { AccAddress, Dec } from "@terra-money/terra.js";
import { FC } from "react";

export type WithdrawValues = { [key in VaultFieldIds]?: string } & {
  total_ust: number;
  total_receive: number;
  account_addr: string;
  beneficiary: AccAddress;
  memo?: string;
};

export interface Props {
  account_addr: string;
  Form: FC;
}

export enum VaultFieldIds {
  anchor1_amount = "anchor1_amount",
  anchor2_amount = "anchor2_amount",
} // others

export type AmountInfo = { fieldId: VaultFieldIds; amount: Dec };

export type VaultField = VaultInfo & { ustBalance: Dec };

export type VaultFieldLimits = {
  [key in VaultFieldIds]: { addr: string; limit: Dec; rate: Dec };
};

export type VaultInfo = {
  name: string;
  fieldId: VaultFieldIds;
  //other needed info
};

export type VaultMap = { [index: string]: VaultInfo };
