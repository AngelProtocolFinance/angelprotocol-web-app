import { ConnectedWallet } from "@terra-dev/wallet-types";
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
  connectType: "metamask" | "xdefi";
};
