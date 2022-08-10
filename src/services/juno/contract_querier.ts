import { ContractQueryArgs } from "services/types";
import { toBase64 } from "helpers";

export default function contract_querier(arg: ContractQueryArgs) {
  //https://phoenix-lcd.terra.dev/swagger
  return `cosmwasm/wasm/v1/contract/${arg.address}/smart/${toBase64(arg.msg)}`;
}
