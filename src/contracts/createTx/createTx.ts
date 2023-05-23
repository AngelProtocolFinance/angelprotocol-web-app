import { AbiCoder } from "@ethersproject/abi";
import { Metadata, TxMeta, TxOptions, TxTypes } from "./types";
import { SimulContractTx } from "types/evm";
import { Contract } from "types/lists";
import { contracts } from "constants/contracts";
import { txs } from "./txs";

export function createTx<T extends TxTypes>(
  sender: string,
  type: T,
  options: TxOptions<T>,
  value?: string
): SimulContractTx {
  const [data, destination] = encodeTx(type, options);
  return {
    from: sender,
    to: destination,
    data,
    ...(value ? { value } : {}),
  };
}

export function encodeTx<T extends TxTypes>(
  type: T,
  options: TxOptions<T>,
  metadata?: Metadata<T>
): [string, string, { id: T; encoded: string }] {
  const [contract_key] = type.split(".");
  const { [contract_key]: c, ...args } = options as any;

  const toEncode: TxMeta | undefined = metadata
    ? { id: type as any, data: metadata }
    : undefined;

  return [
    txs[type](args),
    contract_key in contracts ? contracts[contract_key as Contract] : c,
    {
      id: type as any,
      encoded: toEncode
        ? new AbiCoder().encode(["string"], [JSON.stringify(toEncode)])
        : "",
    },
  ];
}
