import { LCDClient, Msg, StdFee } from "@terra-money/terra.js";

export default async function estimateFee(
  sourceAddress: string,
  msgs: Msg[],
  chainID: string,
  URL: string
): Promise<StdFee> {
  const client = new LCDClient({ chainID, URL });
  return client.tx.estimateFee(sourceAddress, msgs);
}
