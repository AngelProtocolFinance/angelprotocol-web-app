import { TxOptions, TxTypes } from "./types";
import { Contract } from "types/lists";
import { contracts } from "constants/contracts";
import { txs } from "./txs";

export function createTx<T extends TxTypes>(
  sender: string,
  type: T,
  options: TxOptions<T>
) {
  const [contract_key] = type.split(".");
  const { [contract_key]: c, ...args } = options as any;
  const contract =
    contract_key in contracts ? contracts[contract_key as Contract] : c;

  const data = txs[type](args);

  return {
    from: sender,
    to: contract,
    data,
  };
}
