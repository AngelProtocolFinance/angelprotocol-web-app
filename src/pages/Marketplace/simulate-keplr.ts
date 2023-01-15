import Long from "long";
import {
  JSONAccount,
  JUNO_LCD,
  SimulateRes,
  base64FromBytes,
  typeURLs,
} from "./types";
import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  SignerInfo,
  TxBody,
  TxRaw,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { Dwindow } from "types/window";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chains";

const keplr = (window as Dwindow).keplr!;

export async function simulateKeplr() {
  const key = await keplr.getKey(chainIds.juno);
  const address = key.bech32Address;

  const { account } = await fetch(
    JUNO_LCD + `/cosmos/auth/v1beta1/accounts/${address}`
  ).then<{ account: JSONAccount }>((res) => res.json());

  const pub = PubKey.fromJSON({ key: account.pub_key.key });
  const signer: SignerInfo = {
    publicKey: {
      typeUrl: account.pub_key["@type"],
      value: PubKey.encode(pub).finish(),
    },
    modeInfo: {
      single: { mode: SignMode.SIGN_MODE_DIRECT },
      multi: undefined,
    },
    sequence: account.sequence,
  };

  const txBody: TxBody = {
    messages: [
      {
        typeUrl: typeURLs.sendNative,
        value: MsgSend.encode({
          fromAddress: address,
          toAddress: ap_wallets.juno_deposit,
          amount: [{ amount: "100", denom: "ujunox" }],
        }).finish(),
      },
    ],
    memo: "",
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
    timeoutHeight: "0",
  };

  const bodyBytes = TxBody.encode(txBody).finish();

  const authInfo: AuthInfo = {
    signerInfos: [signer],
    fee: {
      amount: [],
      gasLimit: "0",
      granter: "",
      payer: address,
    },
  };

  const txRaw = TxRaw.encode({
    bodyBytes,
    authInfoBytes: AuthInfo.encode(authInfo).finish(),
    //should match number of signer-infos
    signatures: [new Uint8Array(0)],
  }).finish();

  const simulRes = await fetch(JUNO_LCD + "/cosmos/tx/v1beta1/simulate", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromBytes(txRaw),
    }),
  }).then<SimulateRes>((res) => res.json());

  const authInfoWithFee: AuthInfo = {
    ...authInfo,
    fee: {
      amount: [{ amount: "0.025", denom: "ujunox" }],
      gasLimit: `${Math.floor(+simulRes.gas_info.gas_used * 1.5)}`,
      granter: "",
      payer: address,
    },
  };

  const signRes = await keplr.signDirect(chainIds.juno, address, {
    bodyBytes,
    authInfoBytes: AuthInfo.encode(authInfoWithFee).finish(),
    chainId: chainIds.juno,
    accountNumber: Long.fromString(account.account_number),
  });
}
