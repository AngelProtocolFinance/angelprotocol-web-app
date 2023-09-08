import Long from "long";
import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  TxBody,
  TxRaw,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import type { SignerInfo } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { Chain } from "types/aws";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/contracts";
import {
  BroadcastRes,
  BroadcastSuccess,
  Coin,
  JSONAccount,
  SignDoc,
  SimulateRes,
  TxResponse,
  isBroadcastError,
} from "types/cosmos";
import { WalletState } from "contexts/WalletContext";
import {
  base64FromU8a,
  condenseToNum,
  logger,
  objToBase64,
  toU8a,
  u8aFromBase64,
} from "helpers";
import { keplr } from "helpers/keplr";
import {
  BroadcastError,
  CosmosTxSimulationFail,
  TxResultFail,
  TxTimeout,
  WalletDisconnectedError,
  WrongChainError,
} from "errors/errors";

// TODO: uni-6 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
// NOTE: use "High" fee setting on JUNO testnet, otherwise transactions will fail
const GAS_PRICE = "0.075";

// This is the multiplier used when auto-calculating the fees
// https://github.com/cosmos/cosmjs/blob/5bd6c3922633070dbb0d68dd653dc037efdf3280/packages/stargate/src/signingstargateclient.ts#L290
const GAS_ADJUSTMENT = 1.5;

export default class Contract {
  wallet: WalletState | undefined;
  walletAddress: string;

  constructor(wallet: WalletState | undefined) {
    this.wallet = wallet;
    this.walletAddress = wallet?.address || "";
  }

  async estimateFee(msgs: Any[]): Promise<{ feeAmount: number; doc: SignDoc }> {
    try {
      this.verifyWallet();
      const { chain_id, lcd_url, native_currency } = this.wallet!.chain;
      const { account } = await fetch(
        lcd_url + `/cosmos/auth/v1beta1/accounts/${this.walletAddress}`
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
          payer: this.walletAddress,
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

      const res = await fetch(lcd_url + "/cosmos/tx/v1beta1/simulate", {
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
          amount: [
            { amount: `${atomicFeeAmount}`, denom: native_currency.token_id },
          ],
          gasLimit: `${adjustedGas}`,
          granter: "",
          payer: this.walletAddress,
        },
      };

      //add fee to estimated Tx
      return {
        feeAmount: condensedFeeAmount,
        doc: {
          authInfoBytes: AuthInfo.encode(authInfoWithFee).finish(),
          bodyBytes,
          accountNumber: Long.fromString(account.account_number),
          chainId: chain_id,
        },
      };
    } catch (err) {
      logger.error(err);
      throw new CosmosTxSimulationFail();
    }
  }

  async signAndBroadcast(doc: SignDoc): Promise<TxResponse> {
    this.verifyWallet();

    const { chain, address, providerId } = this.wallet!;
    const { lcd_url, chain_id } = chain;
    const client = await keplr(providerId);

    const { signature, signed } = await client.signDirect(
      chain_id,
      address,
      doc
    );

    const tx: TxRaw = {
      authInfoBytes: signed.authInfoBytes,
      bodyBytes: signed.bodyBytes,
      signatures: [u8aFromBase64(signature.signature)],
    };

    const result = await fetch(lcd_url + "/cosmos/tx/v1beta1/txs", {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: base64FromU8a(TxRaw.encode(tx).finish()),
        mode: "BROADCAST_MODE_SYNC",
      }),
    }).then<BroadcastRes>((res) => res.json());

    if (isBroadcastError(result)) {
      throw new BroadcastError(result.message);
    }

    const { code, txhash } = result.tx_response;

    if (code) {
      throw new TxResultFail(chain, txhash);
    }

    return pollTX(
      lcd_url + `/cosmos/tx/v1beta1/txs/${txhash}`,
      10,
      txhash,
      chain
    );
  }

  createExecuteContractMsg(to: string, msg: object, funds: Coin[] = []): Any {
    return {
      typeUrl: typeURLs.executeContract,
      value: MsgExecuteContract.encode({
        contract: to,
        sender: this.walletAddress,
        msg: toU8a(JSON.stringify(msg)),
        funds,
      }).finish(),
    };
  }

  createTransferNativeMsg(
    scaledAmount: string,
    recipient: string,
    denom = this.wallet!.chain.native_currency.token_id
  ): Any {
    return {
      typeUrl: typeURLs.sendNative,
      value: MsgSend.encode({
        fromAddress: this.walletAddress,
        toAddress: recipient,
        amount: [
          {
            denom,
            amount: scaledAmount,
          },
        ],
      }).finish(),
    };
  }

  createEmbeddedWasmMsg(
    to: string,
    msg: object,
    funds: Coin[] = []
  ): EmbeddedWasmMsg {
    return {
      wasm: {
        execute: {
          contract_addr: to,
          funds,
          msg: objToBase64(msg),
        },
      },
    };
  }

  createEmbeddedBankMsg(funds: Coin[], to: string): EmbeddedBankMsg {
    return {
      bank: {
        send: {
          to_address: to,
          amount: funds,
        },
      },
    };
  }

  private verifyWallet() {
    if (!this.wallet) {
      throw new WalletDisconnectedError();
    }
    if (this.wallet.chain.type !== "juno-native") {
      throw new WrongChainError("juno");
    }
  }
}

const typeURLs = {
  /**
   * derived from proto-types path
   * sample: import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx
   * /cosmwasm/wasm/v1/tx -> /cosmwasm.wasm.v1.MsgExecuteContract (from tx file)
   */
  executeContract: "/cosmwasm.wasm.v1.MsgExecuteContract",
  sendNative: "/cosmos.bank.v1beta1.MsgSend",
} as const;

async function pollTX(
  url: string,
  retries: number,
  hash: string,
  chain: Chain
): Promise<TxResponse> {
  if (retries === 0) throw new TxTimeout(chain, hash);

  await new Promise((r) => setTimeout(r, 1000 * (10 - retries)));

  const res = await fetch(url);

  if (res.status === 200) {
    return res.json().then((res: BroadcastSuccess) => res.tx_response);
  }

  return pollTX(url, retries - 1, hash, chain);
}
