import { EncodeObject } from "@cosmjs/proto-signing";
import {
  DeliverTxResponse,
  GasPrice,
  StdFee,
  calculateFee,
  isDeliverTxFailure,
} from "@cosmjs/stargate";
import { Chain, CosmosTx } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { logger } from "helpers";
import { getKeplrClient } from "helpers/keplr";
import {
  CosmosTxSimulationFail,
  TxResultFail,
  WalletDisconnectedError,
  WrongChainError,
} from "errors/errors";
import { IS_TEST } from "constants/env";

// TODO: uni-6 and juno-1 have diff gas prices for fee display only,
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

  async estimateFee(msgs: readonly EncodeObject[]): Promise<StdFee> {
    try {
      this.verifyWallet();
      const { chain_id, rpc_url } = this.wallet!.chain;
      const client = await getKeplrClient(
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

  async signAndBroadcast({ msgs, fee }: CosmosTx) {
    this.verifyWallet();
    const { chain_id, rpc_url } = this.wallet!.chain;
    const client = await getKeplrClient(
      this.wallet?.providerId!,
      chain_id,
      rpc_url
    );
    const result = await client.signAndBroadcast(this.walletAddress, msgs, fee);
    return validateTransactionSuccess(result, this.wallet!.chain);
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
