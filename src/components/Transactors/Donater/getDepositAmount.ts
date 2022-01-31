import { TxLog, Coin } from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import { sc } from "contracts/types";

export default function getDepositAmount(
  logs: TxLog[],
  chainID: string
): number {
  const anchorAddr = contracts[chainID][sc.anchor];
  const eventLog = logs.find((log) => "events" in log);
  const receiveEvent = eventLog!.events.find(
    (event) => event.type === "coin_received"
  );

  const attributes = receiveEvent!.attributes;

  let totalCoinDeposit = Coin.fromString(`0uusd`);

  for (let i = 0; i < attributes.length; i++) {
    const currentAttr = attributes[i];
    if (currentAttr.value === anchorAddr) {
      //get next attribute
      const nextAttr = attributes[i + 1];
      totalCoinDeposit = totalCoinDeposit.add(Coin.fromString(nextAttr.value));
    }
  }

  //.div method rounds it to 0 ??
  return totalCoinDeposit.amount.toNumber() / 1e6;
}
