import { SimulContractTx } from "types/evm";
import { TxOptions, TxType } from "types/tx";
import { txs } from "./txs";

export function createTx<T extends TxType>(
  sender: string,
  type: T,
  options: TxOptions<T>,
  value?: string,
): SimulContractTx {
  const [data, destination] = encodeTx(type, options);
  return {
    from: sender,
    to: destination,
    data,
    ...(value ? { value } : {}),
  };
}

function encodeTx<T extends TxType>(
  type: T,
  options: TxOptions<T>,
): [string, string] {
  const [contract_key] = type.split(".");
  const { [contract_key]: c, ...args } = options as any;

  return [txs[type](args), c];
}
