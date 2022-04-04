import { ConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { DonateValues } from "components/Transactors/Donater/types";

export type TerraDonateArgs = {
  donateValues: DonateValues;
  tx: CreateTxOptions;
  wallet: ConnectedWallet | undefined;
};

export type EthDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};

export type BnbDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};

