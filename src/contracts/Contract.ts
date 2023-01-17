import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { EncodeObject } from "@cosmjs/proto-signing";
import {
  Coin,
  DeliverTxResponse,
  GasPrice,
  MsgSendEncodeObject,
  StdFee,
  calculateFee,
  isDeliverTxFailure,
} from "@cosmjs/stargate";
import { Chain } from "types/aws";
import {
  ADR36SignDoc,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
} from "types/contracts";
import { TxOptions } from "types/slices";
import { WalletState } from "contexts/WalletContext";
import { logger, toBase64 } from "helpers";
import { getKeplrClient, getSigningKeplrClient } from "helpers/keplr";
import {
  CosmosTxSimulationFail,
  TxResultFail,
  WalletDisconnectedError,
  WrongChainError,
} from "errors/errors";
import { IS_TEST } from "constants/env";

// TODO: uni-5 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
// NOTE: use "High" fee setting on JUNO testnet, otherwise transactions will fail
const GAS_PRICE = IS_TEST
  ? GasPrice.fromString("0.025ujunox")
  : GasPrice.fromString("0.0025ujuno");

// This is the multiplier used when auto-calculating the fees
// https://github.com/cosmos/cosmjs/blob/5bd6c3922633070dbb0d68dd653dc037efdf3280/packages/stargate/src/signingstargateclient.ts#L290
const GAS_ADJUSTMENT = 1.3;

export default class Contract {
  wallet: WalletState | undefined;
  walletAddress: string;

  constructor(wallet: WalletState | undefined) {
    this.wallet = wallet;
    this.walletAddress = wallet?.address || "";
  }

  //for on-demand query, use RTK where possible
  async query<T>(to: string, message: Record<string, unknown>) {
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getSigningKeplrClient(
      this.wallet?.providerId!,
      chain_id,
      rpc_url
    );
    const jsonObject = await client.queryContractSmart(to, message);
    return JSON.parse(jsonObject) as T;
  }

  async estimateFee(msgs: readonly EncodeObject[]): Promise<StdFee> {
    try {
      this.verifyWallet();
      const { chain_id, rpc_url } = this.wallet!.chain;
      const client = await getSigningKeplrClient(
        this.wallet?.providerId!,
        chain_id,
        rpc_url
      );
      const gasEstimation = await client.simulate(
        this.walletAddress,
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

  async signAndBroadcast({ msgs, fee }: TxOptions) {
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getSigningKeplrClient(
      this.wallet?.providerId!,
      chain_id,
      rpc_url
    );
    const result = await client.signAndBroadcast(this.walletAddress, msgs, fee);
    return validateTransactionSuccess(result, this.wallet!.chain);
  }

  async signArbitrary(data: object) {
    this.verifyWallet();
    const keplr = getKeplrClient(this.wallet?.providerId!);

    const signature = await keplr.signAmino(
      this.wallet!.chain.chain_id,
      this.walletAddress,
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
              signer: this.walletAddress,
              data: toBase64(data),
            },
          },
        ],
        memo: "",
      }
    );

    return signature;
  }

  async createADR36SignDoc(arbData: object): Promise<ADR36SignDoc> {
    const {
      signed: { msgs },
      signature,
    } = await this.signArbitrary(arbData);
    return {
      msg: [
        {
          type: "sign/MsgSignData",
          value: msgs[0].value,
        },
      ],
      fee: { gas: "0", amount: [] },
      memo: "",
      signatures: [signature],
    };
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
        sender: this.walletAddress,
        msg: toUtf8(JSON.stringify(msg)),
        funds,
      },
    };
  }

  createTransferNativeMsg(
    scaledAmount: string,
    recipient: string,
    denom = this.wallet!.chain.native_currency.token_id
  ): MsgSendEncodeObject {
    return {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: this.walletAddress,
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

  private verifyWallet() {
    if (!this.wallet) {
      throw new WalletDisconnectedError();
    }
    if (this.wallet.chain.type !== "juno-native") {
      throw new WrongChainError("juno");
    }
  }
}

function validateTransactionSuccess(
  result: DeliverTxResponse,
  chain: Chain
): DeliverTxResponse {
  if (isDeliverTxFailure(result)) {
    throw new TxResultFail(
      //DeliverTxResponse already has a hash, link of tx should be available to user
      //pass Chain so getTxUrl can get appropriate explorer link
      chain,
      result.transactionHash
    );
  }

  return result;
}
