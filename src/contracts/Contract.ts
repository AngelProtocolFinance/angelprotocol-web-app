import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { EncodeObject } from "@cosmjs/proto-signing";
import {
  Coin,
  DeliverTxResponse,
  MsgSendEncodeObject,
  StdFee,
  calculateFee,
  isDeliverTxFailure,
} from "@cosmjs/stargate";
import Decimal from "decimal.js";
import { TxOptions } from "slices/transaction/types";
import { EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getKeplrClient from "helpers/getKeplrClient";
import toBase64 from "helpers/toBase64";
import {
  TxResultFail,
  WalletDisconnectError,
  WrongChainError,
} from "errors/errors";
import { GAS_PRICE } from "constants/currency";

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
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getKeplrClient(chain_id, rpc_url);
    const jsonObject = await client.queryContractSmart(
      this.contractAddress,
      message
    );
    return JSON.parse(jsonObject) as T;
  }

  async estimateFee(msgs: readonly EncodeObject[]): Promise<StdFee> {
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getKeplrClient(chain_id, rpc_url);
    const gasEstimation = await client.simulate(
      this.walletAddress,
      msgs,
      undefined
    );
    return calculateFee(Math.round(gasEstimation * 1.3), GAS_PRICE);
  }

  async signAndBroadcast({ msgs, fee }: TxOptions) {
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getKeplrClient(chain_id, rpc_url);
    const result = await client.signAndBroadcast(this.walletAddress, msgs, fee);
    return validateTransactionSuccess(result, chain_id);
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
            denom: this.wallet!.chain.native_currency.token_id,
            amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
          },
        ],
      },
    };
  }

  private verifyWallet() {
    if (!this.wallet) {
      throw new WalletDisconnectError();
    }
    if (this.wallet.chain.type !== "juno-native") {
      throw new WrongChainError("juno");
    }
  }
}

function validateTransactionSuccess(
  result: DeliverTxResponse,
  chain_id: string
): DeliverTxResponse {
  if (isDeliverTxFailure(result)) {
    throw new TxResultFail(
      chain_id,
      result.transactionHash,
      result.height,
      result.code,
      result.rawLog
    );
  }

  return result;
}
