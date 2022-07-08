import { parseRawLog as parseRawCosmJsLog } from "@cosmjs/stargate/build/logs";
import { Log } from "slices/transaction/types";

export default function parseRawLog(rawLog?: string | undefined) {
  return parseRawCosmJsLog(rawLog).map<Log>((log) => ({
    log: log.log,
    msg_index: log.msg_index,
    events: log.events.map((e) => ({
      type: e.type,
      attributes: e.attributes.map((attr) => ({ ...attr })),
    })),
  }));
}
