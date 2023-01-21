import { Msg } from "@terra-money/terra.js";
import type { CreateTxOptions } from "@terra-money/terra.js";
import { PubKey } from "@terra-money/terra.proto/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  TxBody,
  TxRaw,
} from "@terra-money/terra.proto/cosmos/tx/v1beta1/tx";
import type { SignerInfo } from "@terra-money/terra.proto/cosmos/tx/v1beta1/tx";
import type { Any } from "@terra-money/terra.proto/google/protobuf/any";
import Long from "long";
import { JSONAccount, SimulateRes } from "types/cosmos";
import { TerraWallet } from "contexts/WalletContext";
import { condenseToNum } from "helpers/decimal";
import { base64FromU8a } from "helpers/encoding";
import { chains } from "constants/chains";
import { IS_TEST } from "constants/env";

const GAS_ADJUSTMENT = 1.6; //use gas units 60% greater than estimate
// https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
const GAS_PRICE: string = IS_TEST ? "0.15" : "28.325";
const GAS_DENOM = "uluna";

//same as cosmos estimation in general but with the use of terra definitions
export async function estimateTerraGas(
  msgs: Any[],
  wallet: TerraWallet
): Promise<{ feeAmount: number; tx: CreateTxOptions }> {
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
    sequence: Long.fromString(account.sequence),
  };

  const authInfo: AuthInfo = {
    signerInfos: [signer],
    fee: {
      amount: [],
      gasLimit: Long.fromString("0"),
      granter: "",
      payer: sender,
    },
  };

  const txBody: TxBody = {
    messages: msgs,
    memo: "",
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
    timeoutHeight: Long.fromString("0"),
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
  const adjusted = Math.ceil(+gas * GAS_ADJUSTMENT);
  const feeAmount = condenseToNum(adjusted * +GAS_PRICE);

  const txOptions: CreateTxOptions = {
    msgs: msgs.map((msg) =>
      Msg.fromProto(msg, false /** we only support phoenix */)
    ),
    gas: `${adjusted}`,
    gasPrices: `${GAS_PRICE}uluna`,
  };

  //add fee to estimated Tx
  return {
    feeAmount,
    tx: txOptions,
  };
}
