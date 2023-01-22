import { MsgSend as TerraMsgSend } from "@terra-money/terra.proto/cosmos/bank/v1beta1/tx";
import { MsgExecuteContract as TerraMsgExecuteContract } from "@terra-money/terra.proto/cosmwasm/wasm/v1/tx";
import Decimal from "decimal.js";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import {
  SimulContractTx,
  SimulSendNativeTx,
  transfer,
} from "services/apes/helpers/test";
import { WithWallet } from "contexts/WalletContext";
import { Estimate, SubmitStep } from "slices/donation";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import {
  condense,
  condenseToNum,
  logger,
  scale,
  scaleToStr,
  toU8a,
} from "helpers";
import { estimateGas } from "helpers/cosmos/estimateGas";
import { estimateTerraGas } from "helpers/cosmos/estimateTerraGas";
import { ap_wallets } from "constants/ap_wallets";
import { typeURLs } from "constants/cosmos";
import getBreakdown from "./getBreakdown";

export async function estimateDonation({
  recipient,
  details: { token, tokens, pctLiquidSplit },
  wallet,
}: WithWallet<SubmitStep>): Promise<Estimate | null> {
  const native = tokens[0];

  try {
    if (wallet.type === "cosmos") {
      const { fromBal, fromGift } = getBreakdown(token);
      const contract = new Account(wallet);
      const msgs = [];
      if (fromBal) {
        const scaledAmount = scaleToStr(fromBal, token.decimals);
        msgs.push(
          token.type === "juno-native" || token.type === "ibc"
            ? contract.createTransferNativeMsg(
                scaledAmount,
                ap_wallets.juno_deposit,
                token.token_id
              )
            : new CW20(wallet, token.token_id).createTransferMsg(
                scaledAmount,
                ap_wallets.juno_deposit
              )
        );
      }
      if (fromGift) {
        msgs.push(
          new GiftCard(wallet).createSpendMsg(
            recipient.id,
            fromGift,
            token,
            pctLiquidSplit
          )
        );
      }

      const { feeAmount, doc } = await estimateGas(msgs, wallet);

      return {
        type: wallet.type,
        wallet,
        fee: { amount: feeAmount, symbol: native.symbol },
        doc,
      };
    }
    // terra native transaction, send or contract interaction
    else if (wallet.type === "terra") {
      const scaledAmount = scaleToStr(token.amount, token.decimals);

      const msg: Any =
        token.type === "terra-native" || token.type === "ibc"
          ? {
              typeUrl: typeURLs.sendNative,
              value: TerraMsgSend.encode({
                fromAddress: wallet.address,
                toAddress: ap_wallets.terra,
                amount: [{ amount: scaledAmount, denom: token.token_id }],
              }).finish(),
            }
          : {
              typeUrl: typeURLs.executeContract,
              value: TerraMsgExecuteContract.encode({
                contract: token.token_id,
                sender: wallet.address,
                msg: toU8a(
                  JSON.stringify({
                    transfer: {
                      amount: scaledAmount,
                      recipient: ap_wallets.terra,
                    },
                  })
                ),
                funds: [],
              }).finish(),
            };

      const { feeAmount, tx } = await estimateTerraGas([msg], wallet);
      return {
        type: wallet.type,
        wallet,
        fee: { amount: feeAmount, symbol: native.symbol },
        tx,
      };
    }
    // evm transactions
    else {
      const native = tokens[0];
      const scaledAmount = scale(token.amount, token.decimals).toHex();
      const tx: SimulSendNativeTx | SimulContractTx =
        token.type === "evm-native"
          ? { from: wallet.address, value: scaledAmount, to: ap_wallets.eth }
          : {
              from: wallet.address,
              to: token.token_id,
              data: transfer.encode(ap_wallets.eth, scaledAmount),
            };

      const { provider } = wallet;

      const [nonce, gas, gasPrice] = await Promise.all([
        provider.request<string>({
          method: "eth_getTransactionCount",
          params: [wallet.address, "latest"],
        }),

        //for display in summary only but not
        provider.request<string>({ method: "eth_estimateGas", params: [tx] }),
        provider.request<string>({
          method: "eth_gasPrice",
        }),
      ]);
      const feeAmount = condense(gasPrice, native.decimals).mul(gas).toNumber();

      return {
        type: wallet.type,
        wallet,
        fee: { amount: feeAmount, symbol: native.symbol },
        tx: { ...tx, nonce },
      };
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}
