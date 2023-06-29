import { SignClient } from "@walletconnect/sign-client";
import { ISignClient } from "@walletconnect/types";

let client: ISignClient;
export async function signClient(): Promise<ISignClient> {
  if (client) return client;
  client = await SignClient.init({
    projectId: "039a7aeef39cb740398760f71a471957",
  });
  return client;
}
