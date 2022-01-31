import { FC } from "react";

export enum VaultFields {
  anchor1_amount = "anchor1_amount",
  anchor2_amount = "anchor2_amount",
} // others

export enum VaultAddrFields {
  anchor1_addr = "anchor1_addr",
  anchor2_addr = "anchor2_addr",
}

export type Values = { [key in VaultFields]: string } & {
  total_ust: number;
  total_receive: number;
  account_addr: string;
};

export interface Props {
  account_addr: string;
  Form: FC;
}
