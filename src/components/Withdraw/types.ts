import { ReactNode } from "react";

export enum VaultFields {
  anchor1_amount = "anchor1_amount",
  anchor2_amount = "anchor2_amount",
} // others

export type Values = { [key in VaultFields]: string } & {
  total_ust: number;
  total_receive: number;
  account_addr: string;
};

export interface WithdrawProps {
  account_addr: string;
  children: ReactNode;
}
