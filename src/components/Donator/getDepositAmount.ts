import { TxLog, Coin, Denom } from "@terra-money/terra.js";

const anchorContractAddr = "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal";

export default function getDepositAmount(logs: TxLog[]): number {
  const eventLog = logs.find((log) => "events" in log);
  const receiveEvent = eventLog!.events.find(
    (event) => event.type === "coin_received"
  );

  const attributes = receiveEvent!.attributes;

  let totalCoinDeposit = Coin.fromString(`0${Denom.USD}`);

  for (let i = 0; i < attributes.length; i++) {
    const currentAttr = attributes[i];
    if (currentAttr.value === anchorContractAddr) {
      //get next attribute
      const nextAttr = attributes[i + 1];
      totalCoinDeposit = totalCoinDeposit.add(Coin.fromString(nextAttr.value));
    }
  }

  //.div method rounds it to 0 ??
  return totalCoinDeposit.amount.toNumber() / 1e6;
}
