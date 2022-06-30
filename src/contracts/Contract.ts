import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import {
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  QueryRes,
} from "types/server/contracts";
import {
  Coin as CosmosCoin,
  MsgExecuteContract,
  MsgExecuteContractEncodeObject,
} from "types/third-party/cosmjs";
import contract_querier from "services/juno/contract_querier";
import { toUtf8 } from "helpers/third-party/cosmjs";
import toBase64 from "helpers/toBase64";
import { WalletDisconnectError } from "errors/errors";
import { terraChainId } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { junoLcdUrl, terraLcdUrl } from "constants/urls";

export default class Contract {
  client: LCDClient;
  walletAddr: string;

  constructor(walletAddr?: string) {
    this.walletAddr = walletAddr || "";
    this.client = new LCDClient({
      chainID: terraChainId,
      URL: terraLcdUrl,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });
  }

  static gasAdjustment = 1.6; //use gas units 60% greater than estimate

  // https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [
    new Coin(denoms.uusd, 0.15),
    //for classic, pisco is 0.15
    new Coin(denoms.uluna, 5.665),
  ];

  //for on-demand query, use RTK where possible
  async query<T>(source: string, message: object) {
    const queryPath = contract_querier({ address: source, msg: message });
    const res = await fetch(`${junoLcdUrl}/${queryPath}`);
    const jsonRes: QueryRes<T> = await res.json();
    return jsonRes.data;
  }

  async estimateFee(msgs: Msg[]): Promise<Fee> {
    if (!this.walletAddr) {
      throw new WalletDisconnectError();
    }

    const account = await this.client.auth.accountInfo(this.walletAddr);

    return this.client.tx.estimateFee(
      [{ sequenceNumber: account.getSequenceNumber() }],
      { msgs, feeDenoms: [denoms.uluna] }
    );
  }

  createContractMsg(
    sender: string,
    contract: string,
    msg: object,
    funds?: CosmosCoin[]
  ): MsgExecuteContractEncodeObject {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender,
        contract,
        msg: toUtf8(JSON.stringify(msg)),
        funds,
      }),
    };
  }

  createEmbeddedWasmMsg(
    funds: Coin.Data[],
    to: string,
    msg: object
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

  createEmbeddedBankMsg(funds: Coin.Data[], to: string): EmbeddedBankMsg {
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
