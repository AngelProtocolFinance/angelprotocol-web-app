import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import type { SignerInfo } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import {
  AuthInfo,
  TxBody,
  TxRaw,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { chains } from "constants/chains";
import { condenseToNum } from "helpers/decimal";
import { base64FromU8a } from "helpers/encoding";
import Long from "long";
import { CosmosChainID } from "types/chain";
import { JSONAccount, SimulateRes } from "types/cosmos";
import { EstimateResult } from "types/tx";

const GAS_PRICE = "0.075";

// This is the multiplier used when auto-calculating the fees
// https://github.com/cosmos/cosmjs/blob/5bd6c3922633070dbb0d68dd653dc037efdf3280/packages/stargate/src/signingstargateclient.ts#L290
const GAS_ADJUSTMENT = 1.5;

export async function estimateCosmosFee(
  chainID: CosmosChainID,
  sender: string,
  msgs: Any[],
): Promise<EstimateResult> {
  const chain = chains[chainID];
  const { account } = await fetch(
    chain.lcd + `/cosmos/auth/v1beta1/accounts/${sender}`,
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
    messages: msgs,
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
  }).then<SimulateRes>((res) => {
    //TODO: create fetch wrapper than handle response error by default
    if (!res.ok) throw new Error();
    return res.json();
  });

  const gas = res.gas_info.gas_used;
  const adjustedGas = Math.ceil(+gas * GAS_ADJUSTMENT);
  const atomicFeeAmount = Math.ceil(adjustedGas * +GAS_PRICE); //e.g 4253ujuno
  const condensedFeeAmount = condenseToNum(atomicFeeAmount); //e.g 0.004253juno

  const authInfoWithFee: AuthInfo = {
    ...authInfo,
    fee: {
      amount: [{ amount: `${atomicFeeAmount}`, denom: chain.nativeToken.id }],
      gasLimit: `${adjustedGas}`,
      granter: "",
      payer: sender,
    },
  };

  //add fee to estimated Tx
  return {
    fee: {
      amount: condensedFeeAmount,
      symbol: chain.nativeToken.symbol,
      coinGeckoId: chain.nativeToken.coinGeckoId,
    },

    chainID,
    toSend: {
      authInfoBytes: AuthInfo.encode(authInfoWithFee).finish(),
      bodyBytes,
      accountNumber: Long.fromString(account.account_number),
      chainId: chain.id,
    },
  };
}
