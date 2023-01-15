import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { Coin, EncodeObject } from "@cosmjs/proto-signing";
import {
  GasPrice,
  MsgSendEncodeObject,
  StdFee,
  calculateFee,
} from "@cosmjs/stargate";
import { JSONAccount, Msg, SimulateRes } from "./types";
import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  SignerInfo,
  TxBody,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import type { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/contracts";
import { CosmosWallet } from "contexts/WalletContext";
import { base64FromU8a, logger, toBase64, toU8a } from "helpers";
import { CosmosTxSimulationFail } from "errors/errors";
import { chains } from "constants/chains";
import { typeURLs } from "constants/cosmos";
import { IS_TEST } from "constants/env";
import { junoDenom } from "constants/tokens";

// TODO: uni-5 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
// NOTE: use "High" fee setting on JUNO testnet, otherwise transactions will fail
const GAS_PRICE = IS_TEST
  ? GasPrice.fromString("0.025ujunox")
  : GasPrice.fromString("0.0025ujuno");

// This is the multiplier used when auto-calculating the fees
// https://github.com/cosmos/cosmjs/blob/5bd6c3922633070dbb0d68dd653dc037efdf3280/packages/stargate/src/signingstargateclient.ts#L290
const GAS_ADJUSTMENT = 1.3;
const gas_price = IS_TEST ? 0.025 : 0.0025;

export default class Contract {
  wallet: CosmosWallet;

  constructor(wallet: CosmosWallet) {
    this.wallet = wallet;
  }
  //for on-demand query, use RTK where possible
  async query<T>(to: string, message: Record<string, unknown>) {
    const jsonObject = await this.wallet.client.queryContractSmart(to, message);
    return JSON.parse(jsonObject) as T;
  }

  async estimateFee(msgs: readonly EncodeObject[]): Promise<StdFee> {
    try {
      const gasEstimation = await this.wallet.client.simulate(
        this.wallet.address,
        msgs,
        undefined
      );
      return calculateFee(
        Math.round(gasEstimation * GAS_ADJUSTMENT),
        GAS_PRICE
      );
    } catch (err) {
      logger.error(err);
      throw new CosmosTxSimulationFail();
    }
  }

  createExecuteContractMsg(
    to: string,
    msg: object,
    funds: Coin[] = []
  ): MsgExecuteContractEncodeObject {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: {
        contract: to,
        sender: this.wallet.address,
        msg: toUtf8(JSON.stringify(msg)),
        funds,
      },
    };
  }

  createExecuteContractMsgV2(
    to: string,
    msg: object,
    funds: Coin[] = []
  ): Msg<MsgExecuteContract> {
    return {
      typeUrl: typeURLs.executeContract,
      value: {
        contract: to,
        sender: this.wallet.address,
        msg: toU8a(JSON.stringify(msg)),
        funds,
      },
    };
  }

  async estimateGas(
    msgs: readonly Msg<any>[]
  ): Promise<{ gas: string; simTx: TxRaw }> {
    const { address, chainId } = this.wallet;
    const chain = chains[chainId];
    const { account } = await fetch(
      chain.lcd + `/cosmos/auth/v1beta1/accounts/${address}`
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
        payer: address,
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

    //simTx can be reused, just replace fee and add signatures
    return { gas: res.gas_info.gas_used, simTx };
  }

  createTransferNativeMsgV2(
    scaledAmount: string,
    recipient: string,
    denom = junoDenom as string
  ): Msg<MsgSend> {
    return {
      typeUrl: typeURLs.sendNative,
      value: {
        fromAddress: this.wallet.address,
        toAddress: recipient,
        amount: [
          {
            denom,
            amount: scaledAmount,
          },
        ],
      },
    };
  }

  createTransferNativeMsg(
    scaledAmount: string,
    recipient: string,
    denom = junoDenom as string
  ): MsgSendEncodeObject {
    return {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: this.wallet.address,
        toAddress: recipient,
        amount: [
          {
            denom,
            amount: scaledAmount,
          },
        ],
      },
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
          msg: toBase64(msg),
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
}
