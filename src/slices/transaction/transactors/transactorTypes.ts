import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { CreateTxOptions } from "@terra-money/terra.js";
import { DonateValues } from "@types-component/donater";
import { WalletProxy } from "providers/WalletProvider";

export type TerraDonateArgs = {
  donateValues: DonateValues;
  tx: CreateTxOptions;
  wallet: WalletProxy | undefined;
};

export type EthDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};

export type BnbDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};
