import { JSONAccount, JUNO_LCD, typeURLs } from "./types";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { SimulateRequest } from "cosmjs-types/cosmos/tx/v1beta1/service";
import {
  AuthInfo,
  SignerInfo,
  Tx,
  TxBody,
  TxRaw,
} from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import { Long, base64FromBytes, bytesFromBase64 } from "cosmjs-types/helpers";
import { Dwindow } from "types/window";
import { chainIds } from "constants/chains";
import { junoDenom } from "constants/tokens";

const keplr = (window as Dwindow).keplr!;

export async function simulate() {
  const key = await keplr.getKey("uni-5");
  const _signer = keplr.getOfflineSigner(chainIds.juno);

  const _accounts = await _signer.getAccounts();
  const _account = _accounts[0];

  const address = key.bech32Address;
  const { account } = await fetch(
    JUNO_LCD + `/cosmos/auth/v1beta1/accounts/${key.bech32Address}`
  ).then<{ account: JSONAccount }>((res) => res.json());

  const signer: SignerInfo = {
    publicKey: {
      typeUrl: account.pub_key["@type"],
      value: bytesFromBase64(account.pub_key.key),
    },
    modeInfo: { single: { mode: SignMode.SIGN_MODE_DIRECT } },
    sequence: Long.fromString(account.sequence),
  };

  const authInfo = AuthInfo.fromPartial({
    signerInfos: [signer],
    fee: undefined,
  });

  const txBody: TxBody = TxBody.fromPartial({
    messages: [
      {
        typeUrl: typeURLs.sendNative,
        value: MsgSend.encode({
          fromAddress: address,
          toAddress: "juno17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwtxsp2l",
          amount: [{ amount: "1000", denom: junoDenom }],
        }).finish(),
      },
    ],
  });

  const tx = Tx.fromPartial({ body: txBody, authInfo, signatures: [] });

  const txRaw = TxRaw.fromPartial({
    bodyBytes: TxBody.encode(txBody).finish(),
    authInfoBytes: AuthInfo.encode(authInfo).finish(),
    signatures: [bytesFromBase64("")],
  });

  console.log(txRaw);

  //   const request: any = SimulateRequest.toJSON({
  //     txBytes: Tx.encode(tx).finish(),
  //   });

  //   console.log(request);

  const result = await fetch(JUNO_LCD + "/cosmos/tx/v1beta1/simulate", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromBytes(Tx.encode(tx).finish()),
    }),
  }).then((res) => res.json());

  console.log(result);
}
