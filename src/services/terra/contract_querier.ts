import { ContractQueryArgs } from "types/services/terra";

export default function contract_querier(arg: ContractQueryArgs) {
  const query_msg = Buffer.from(JSON.stringify(arg.msg)).toString("base64");
  return {
    url: `terra/wasm/v1beta1/contracts/${arg.address}/store`,
    params: { query_msg },
  };
}
