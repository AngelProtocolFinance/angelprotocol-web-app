import { Interface } from "@ethersproject/abi";
import { Tupleable } from "types/evm";

export type FetchResult =
  | { result: string }
  | { error: { code: number; message: string } };

export type ResultDecoder<FinalResult> = (
  result: string,
  iface: Interface,
  contractAddress: string
) => FinalResult;

export type Query<Args extends Tupleable, Result> = {
  args: Args;
  result: Result;
};

type GetFirstConstructorArgType<T> = T extends new (
  arg1: infer U,
  ...args: any[]
) => any
  ? U
  : never;
export type AbiFragments = GetFirstConstructorArgType<typeof Interface>;
