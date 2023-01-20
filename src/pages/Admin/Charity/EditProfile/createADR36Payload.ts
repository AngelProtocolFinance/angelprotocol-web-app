import { ADR36Payload } from "types/cosmos";
import { WalletState } from "contexts/WalletContext";
import { toBase64 } from "helpers";
import { getKeplrClient } from "helpers/keplr";

export async function createADR36Payload(
  data: object,
  wallet: WalletState
): Promise<ADR36Payload> {
  const keplr = getKeplrClient(wallet.providerId);

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
  const { msgs, fee, memo } = signed;
  return { fee, memo, msg: msgs, signatures: [signature] };
}
