import { ContractQueryArgs } from "services/types";
import toBase64 from "helpers/toBase64";

export default function contract_querier(arg: ContractQueryArgs) {
  return `cosmwasm/wasm/v1/contract/${arg.address}/smart/${toBase64(arg.msg)}`;
}
