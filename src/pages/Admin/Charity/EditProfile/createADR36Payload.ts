import { ADR36Payload } from "types/aws";
import { CosmosWallet } from "contexts/WalletContext";
import { toBase64 } from "helpers";

export async function createADR36Payload(
  data: object,
  { chainId, address, client }: CosmosWallet
): Promise<ADR36Payload> {
  const { signed, signature } = await client.signAmino(chainId, address, {
    chain_id: "",
    account_number: "0",
    sequence: "0",
    fee: {
      gas: "0",
      amount: [],
    },
    msgs: [
      {
        type: "sign/MsgSignData",
        value: {
          signer: address,
          data: toBase64(data),
        },
      },
    ],
    memo: "",
  });
  const { msgs, ...rest } = signed;
  return { ...rest, msg: msgs, signatures: [signature] };
}
