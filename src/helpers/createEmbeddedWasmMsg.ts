import { Coin } from "@cosmjs/proto-signing";
import { EmbeddedWasmMsg } from "types/server/contracts";
import toBase64 from "./toBase64";

export default function createEmbeddedWasmMsg(
  funds: Coin[],
  to: string,
  msg: object
): EmbeddedWasmMsg {
  return {
    wasm: {
      execute: {
        contract_addr: to,
        funds,
        msg: toBase64(msg),
      },
    },
  };
}
