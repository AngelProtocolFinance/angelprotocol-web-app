import { contracts } from "constant/contracts";
import { EMPTY_DATA } from "constant/evm";
import { SimulContractTx } from "types/evm";
import { Contract } from "types/lists";
import { Metadata, TxMeta, TxOptions, TxType } from "types/tx";
import { toAbiStr } from "helpers";
import { txs } from "./txs";

export function createTx<T extends TxType>(
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

export function encodeTx<T extends TxType>(
  type: T,
  options: TxOptions<T>,
  meta?: { content: Metadata<T>; title: string; description: string }
): [string, string, { id: T; encoded: string }] {
  const [contract_key] = type.split(".");
  const { [contract_key]: c, ...args } = options as any;

  const toEncode: TxMeta | undefined = meta
    ? {
        id: type as any,
        data: meta.content,
        title: meta.title,
        description: meta.description,
      }
    : undefined;

  return [
    txs[type](args),
    contract_key in contracts ? contracts[contract_key as Contract] : c,
    {
      id: type as any,
      encoded: toEncode ? toAbiStr(toEncode) : EMPTY_DATA,
    },
  ];
}
