import { ADR36Payload } from "types/aws";
import { WalletState } from "contexts/WalletContext";
import { objToBase64 } from "helpers";
import { keplr as _keplr } from "helpers/keplr";

export async function createADR36Payload(
  data: object,
  wallet: WalletState
): Promise<ADR36Payload> {
  const keplr = await _keplr(wallet.providerId);

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
            data: objToBase64(data),
          },
        },
      ],
      memo: "",
    }
  );
  const { msgs, ...rest } = signed;
  return { ...rest, msg: msgs, signatures: [signature] };
}
