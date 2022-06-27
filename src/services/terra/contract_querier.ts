import { ContractQueryArgs } from "services/types";
import toBase64 from "helpers/toBase64";

export default function contract_querier(arg: ContractQueryArgs) {
  const query_msg = toBase64(arg.msg);
  return `terra/wasm/v1beta1/contracts/${arg.address}/store?query_msg=${query_msg}`;
}
