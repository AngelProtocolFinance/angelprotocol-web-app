import {
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
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
import { TxOptions } from "slices/transaction/types";
import { Dwindow } from "types/ethereum";
import { EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { condenseToNum, scaleToStr, toBase64 } from "helpers";
import {
  TxResultFail,
  WalletDisconnectedError,
  WrongChainError,
} from "errors/errors";
import { IS_TEST } from "constants/env";

// TODO: uni-3 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
// NOTE: use "High" fee setting on JUNO testnet, otherwise transactions will fail
const GAS_PRICE = IS_TEST
  ? GasPrice.fromString("0.025ujunox")
  : GasPrice.fromString("0.0025ujuno");

// This is the multiplier used when auto-calculating the fees
// https://github.com/cosmos/cosmjs/blob/5bd6c3922633070dbb0d68dd653dc037efdf3280/packages/stargate/src/signingstargateclient.ts#L290
const GAS_MULTIPLIER = 1.3;

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

  async estimateFee(
    msgs: readonly EncodeObject[]
  ): Promise<{ fee: StdFee; feeAmount: number }> {
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getKeplrClient(chain_id, rpc_url);
    const gasEstimation = await client.simulate(
      this.walletAddress,
      msgs,
      undefined
    );
    const denom = this.wallet!.chain.native_currency.token_id;
    return createFeeResult(gasEstimation, denom);
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
            amount: scaleToStr(amount),
          },
        ],
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

function createFeeResult(
  gasEstimation: number,
  denom: string
): {
  fee: StdFee;
  feeAmount: number;
} {
  const fee = calculateFee(
    Math.round(gasEstimation * GAS_MULTIPLIER),
    GAS_PRICE
  );
  const feeAmount = extractFeeAmount(fee, denom);

  return { fee, feeAmount };
}

function extractFeeAmount(fee: StdFee, denom: string): number {
  return condenseToNum(fee.amount.find((a) => a.denom === denom)!.amount);
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

async function getKeplrClient(
  chain_id: string,
  rpc_url: string
): Promise<SigningCosmWasmClient> {
  const signer = (window as Dwindow).keplr!.getOfflineSigner(chain_id);
  const client = await SigningCosmWasmClient.connectWithSigner(rpc_url, signer);
  return client;
}
