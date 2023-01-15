import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  SignerInfo,
  TxBody,
  TxRaw,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { JSONAccount, Msg, SimulateRes } from "types/cosmos";
import { CosmosWallet } from "contexts/WalletContext";
import { chains } from "constants/chains";
import { IS_TEST } from "constants/env";
import { junoDenom } from "constants/tokens";
import { base64FromU8a } from "../toBase64";

const GAS_ADJUSTMENT = 1.3;
const GAS_PRICE = IS_TEST ? "0.025" : "0.0025";

export async function estimateGas(
  msgs: readonly Msg<any>[],
  wallet: CosmosWallet
): Promise<{ gas: string; txWithFee: TxRaw; accountNumber: string }> {
  const { address: sender, chainId } = wallet;
  const chain = chains[chainId];
  const { account } = await fetch(
    chain.lcd + `/cosmos/auth/v1beta1/accounts/${sender}`
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

  const authInfo: AuthInfo = {
    signerInfos: [signer],
    fee: {
      amount: [],
      gasLimit: "0",
      granter: "",
      payer: sender,
    },
  };

  const txBody: TxBody = {
    messages: msgs.map((msg) => ({
      typeUrl: msg.typeUrl,
      value: Any.encode(msg.value).finish(),
    })),
    memo: "",
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
    timeoutHeight: "0",
  };

  const bodyBytes = TxBody.encode(txBody).finish();
  const simTx: TxRaw = {
    bodyBytes,
    authInfoBytes: AuthInfo.encode(authInfo).finish(),
    //num of signature must match num of signers
    signatures: [new Uint8Array(0)],
  };

  const res = await fetch(chain.lcd + "/cosmos/tx/v1beta1/simulate", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromU8a(TxRaw.encode(simTx).finish()),
    }),
  }).then<SimulateRes>((res) => res.json());

  const gas = res.gas_info.gas_used;

  const authInfoWithFee: AuthInfo = {
    ...authInfo,
    fee: {
      amount: [{ amount: GAS_PRICE, denom: junoDenom }],
      gasLimit: `${Math.floor(+gas * GAS_ADJUSTMENT)}`,
      granter: "",
      payer: sender,
    },
  };
  const txWithFee: TxRaw = {
    ...simTx,
    authInfoBytes: AuthInfo.encode(authInfoWithFee).finish(),
  };
  //add fee to estimated Tx
  return { gas, txWithFee, accountNumber: account.account_number };
}
