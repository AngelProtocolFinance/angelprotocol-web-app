import { ContractQueryArgs } from "services/types";

export default function contract_querier(arg: ContractQueryArgs) {
  const query_msg = btoa(JSON.stringify(arg.msg));
  return `cosmwasm/wasm/v1/contract/${arg.address}/smart/${query_msg}`;
}
