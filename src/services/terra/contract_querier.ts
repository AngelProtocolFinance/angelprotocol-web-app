import { ContractQueryArgs } from "types/services/terra";

export default function contract_querier(arg: ContractQueryArgs) {
  const query_msg = btoa(JSON.stringify(arg.msg));
  return {
    url: `terra/wasm/v1beta1/contracts/${arg.address}/store`,
    params: { query_msg },
  };
}
