import { WalletState } from "@giving/contexts/wallet-context";
import { toBase64 } from "@giving/helpers";
import { getKeplr } from "@giving/helpers/keplr";
import { ADR36Payload } from "@giving/types/aws";

export async function createADR36Payload(
  data: object,
  wallet: WalletState
): Promise<ADR36Payload> {
  const keplr = getKeplr(wallet.providerId);

  const { signed, signature } = await keplr.signAmino(
    wallet.chain.chain_id,
    wallet.address,
    {
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
            signer: wallet.address,
            data: toBase64(data),
          },
        },
      ],
      memo: "",
    }
  );
  const { msgs, ...rest } = signed;
  return { ...rest, msg: msgs, signatures: [signature] };
}
