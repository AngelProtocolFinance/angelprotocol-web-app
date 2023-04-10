import { Interface } from "@ethersproject/abi";
import { Tupleable } from "types/evm";

export type FetchResult =
  | { result: string }
  | { error: { code: number; message: string } };

export type ResultDecoder<DecodedResult, FinalResult> = (
  decodedResult: DecodedResult,
  contractAddress: string,
  iface: Interface
) => FinalResult;

export type Query<Args extends Tupleable, DecodedResult, FinalResult> = {
  args: Args;
  decodedResult: DecodedResult;
  finalResult: FinalResult;
};

type GetFirstConstructorArgType<T> = T extends new (
  arg1: infer U,
  ...args: any[]
) => any
  ? U
  : never;
export type AbiFragments = GetFirstConstructorArgType<typeof Interface>;
