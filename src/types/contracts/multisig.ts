import { Except, OverrideProperties } from "type-fest";
import { MultiSigStorage } from "../typechain-types/contracts/multisigs/MultiSigGeneric";
import { Tupleable } from "../evm";
import { TransactionStatus } from "../lists";
import { Plain } from "../utils";

export interface NewTransaction extends Tupleable {
  title: string;
  description: string;
  destination: string;
  value: string;
  data: string;
  meta: string;
}

export type Transaction = OverrideProperties<
  Except<Plain<MultiSigStorage.TransactionStruct>, "executed">,
  { value: string; metadata: string; data: string }
  //add id and status
> & { status: TransactionStatus; id: number };

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};
