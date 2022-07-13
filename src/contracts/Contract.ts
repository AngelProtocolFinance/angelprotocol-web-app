import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { EncodeObject } from "@cosmjs/proto-signing";
import {
  Coin,
  GasPrice,
  MsgSendEncodeObject,
  StdFee,
  calculateFee,
} from "@cosmjs/stargate";
import Decimal from "decimal.js";
import { TxOptions } from "slices/transaction/types";
import { EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getCosmosClient from "helpers/getCosmosClient";
import toBase64 from "helpers/toBase64";
import { MAIN_DENOM } from "constants/currency";
import { IS_TEST } from "constants/env";

// TODO: uni-3 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
const GAS_PRICE = IS_TEST
  ? GasPrice.fromString("0.025ujunox")
  : GasPrice.fromString("0.0025ujuno");

export default class Contract {
  contractAddress: string;
  wallet: WalletState | undefined;
  walletAddress: string;

  constructor(wallet: WalletState | undefined, contractAddress = "") {
    this.contractAddress = contractAddress;
    this.wallet = wallet;
    this.walletAddress = wallet?.address || "";
  }

  //for on-demand query, use RTK where possible
  async query<T>(message: Record<string, unknown>) {
    const client = await getCosmosClient(this.wallet);
    const jsonObject = await client.queryContractSmart(
      this.contractAddress,
      message
    );
    return JSON.parse(jsonObject) as T;
  }

  async estimateFee(
    msgs: readonly EncodeObject[]
  ): Promise<{ fee: StdFee; feeNum: number }> {
    const client = await getCosmosClient(this.wallet);
    const gasLimit = await client.simulate(this.walletAddress, msgs, undefined);
    return createFeeResult(gasLimit);
  }

  async signAndBroadcast(tx: TxOptions) {
    const client = await getCosmosClient(this.wallet);
    return await client.signAndBroadcast(this.walletAddress, tx.msgs, tx.fee);
  }

  createEmbeddedWasmMsg(funds: Coin[], msg: object): EmbeddedWasmMsg {
    return {
      wasm: {
        execute: {
          contract_addr: this.contractAddress,
          funds,
          msg: toBase64(msg),
        },
      },
    };
  }

  createExecuteContractMsg(
    msg: object,
    funds: Coin[] = []
  ): MsgExecuteContractEncodeObject {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: {
        contract: this.contractAddress,
        sender: this.walletAddress,
        msg: toUtf8(JSON.stringify(msg)),
        funds,
      },
    };
  }

  createTransferNativeMsg(
    amount: number,
    recipient: string
  ): MsgSendEncodeObject {
    return {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: this.walletAddress,
        toAddress: recipient,
        amount: [
          {
            denom: MAIN_DENOM,
            amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
          },
        ],
      },
    };
  }
}

function createFeeResult(gasLimit: number): { fee: StdFee; feeNum: number } {
  const fee = calculateFee(gasLimit, GAS_PRICE);

  return {
    fee,
    feeNum: extractFeeNum(fee),
  };
}

function extractFeeNum(fee: StdFee): number {
  return new Decimal(fee.amount.find((a) => a.denom === MAIN_DENOM)!.amount)
    .div(1e6)
    .toNumber();
}
