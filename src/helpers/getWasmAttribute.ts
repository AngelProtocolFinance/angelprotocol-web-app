import { Log } from "types/cosmos";

export function getWasmAttribute(attribute: string, logs: Log[]) {
  return logs[0].events
    .find((e) => e.type === "wasm")
    ?.attributes.find((a) => a.key === attribute)?.value;
}
