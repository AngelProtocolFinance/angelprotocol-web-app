import { Except, OverrideProperties } from "type-fest";
import { MultiSigStorage } from "../typechain-types/contracts/multisigs/MultiSigGeneric";
import { TransactionStatus } from "../lists";
import { Plain } from "../utils";

export type NewTransaction = {
  destination: string;
  value: string;
  data: string;
  meta: string;
};

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};
