import { ContractQueryArgs } from "services/types";

export default function contract_querier(arg: ContractQueryArgs) {
  const query_msg = btoa(JSON.stringify(arg.msg));
  return `terra/wasm/v1beta1/contracts/${arg.address}/store?query_msg=${query_msg}`;
}
