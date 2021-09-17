import { TxLog } from "@terra-money/terra.js";

export default function getDepositAmount(logs: TxLog[]) {
  const eventLog = logs.find((log) => "events" in log);
  const receiveEvent = eventLog?.events.find(
    (event) => event.type === "coin_received"
  );
  const amountAttributes = receiveEvent?.attributes.filter(
    (attr) => attr.key === "amount"
  );

  console.log(amountAttributes);
}
