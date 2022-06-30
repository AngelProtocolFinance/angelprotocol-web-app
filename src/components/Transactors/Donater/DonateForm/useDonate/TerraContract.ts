import {
  Coin,
  Fee,
  LCDClient,
  Msg,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { EmbeddedWasmMsg } from "types/server/contracts";
import toBase64 from "helpers/toBase64";
import { denoms } from "constants/currency";
import { terraChainId } from "constants/env";
import { terraLcdUrl } from "constants/urls";

const GAS_ADJUSTMENT = 1.6; //use gas units 60% greater than estimate

// https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
const GAS_PRICES = [
  new Coin(denoms.uusd, 0.15),
  //for classic, pisco is 0.15
  new Coin(denoms.uluna, 5.665),
];

export default class TerraContract {
  client: LCDClient;
  walletAddr: string;

  constructor(walletAddr?: string) {
    this.walletAddr = walletAddr || "";
    this.client = new LCDClient({
      chainID: terraChainId,
      URL: terraLcdUrl,
      gasAdjustment: GAS_ADJUSTMENT, //use gas units 20% greater than estimate
      gasPrices: GAS_PRICES,
    });
  }

  //for on-demand query, use RTK where possible
  async query<T>(source: string, message: object) {
    return this.client.wasm.contractQuery<T>(source, message);
  }

  async estimateFee(msgs: Msg[]): Promise<{ fee: Fee; feeNum: number }> {
    const account = await this.client.auth.accountInfo(this.walletAddr);

    const fee = await this.client.tx.estimateFee(
      [{ sequenceNumber: account.getSequenceNumber() }],
      { msgs, feeDenoms: [denoms.uluna] }
    );

    const feeNum = extractFeeNum(fee);

    return { fee, feeNum };
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

  createTransferMsg(
    cw20ContractAddr: string,
    amount: number,
    recipient: string
  ) {
    return new MsgExecuteContract(this.walletAddr, cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        recipient,
      },
    });
  }
}

function extractFeeNum(fee: Fee): number {
  return fee.amount.get(denoms.uluna)!.div(1e6).amount.toNumber();
}
