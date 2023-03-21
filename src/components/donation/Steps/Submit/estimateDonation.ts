import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "./types";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/donation";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import { transfer } from "contracts/evm/ERC20";
import { extractFeeAmount, logger, scale, scaleToStr } from "helpers";
import { estimateFee } from "helpers/evm/estimateFee";
import { ap_wallets } from "constants/ap_wallets";
import estimateTerraFee from "./estimateTerraFee";
import getBreakdown from "./getBreakdown";

export async function estimateDonation({
  recipient,
  details: { token, pctLiquidSplit },
  wallet,
  terraWallet,
}: SubmitStep & {
  wallet: WalletState;
  terraWallet?: ConnectedWallet;
}): Promise<Estimate | null> {
  const { chain } = wallet;
  const { native_currency } = chain;

  try {
    if (chain.type === "juno-native") {
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
      const fee = await contract.estimateFee(msgs);
      const feeAmount = extractFeeAmount(fee, wallet.displayCoin.token_id);
      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: { type: "cosmos", val: { fee, msgs } },
      };
    }
    // terra native transaction, send or contract interaction
    else if (chain.type === "terra-native") {
      const scaledAmount = scaleToStr(token.amount, token.decimals);

      const msg =
        token.type === "terra-native" || token.type === "ibc"
          ? new MsgSend(wallet.address, ap_wallets.terra, [
              new Coin(token.token_id, scaledAmount),
            ])
          : new MsgExecuteContract(wallet.address, token.token_id, {
              transfer: {
                amount: scaledAmount,
                recipient: ap_wallets.terra,
              },
            });

      const fee = await estimateTerraFee(wallet, [msg]);
      const feeAmount = extractFeeAmount(fee, wallet.displayCoin.token_id);
      return {
        fee: { amount: feeAmount, symbol: native_currency.symbol },
        tx: {
          type: "terra",
          val: { fee, msgs: [msg] },
          wallet: terraWallet!,
        },
      };
    }
    // evm transactions
    else {
      const scaledAmount = scale(token.amount, token.decimals).toHex();
      const tx: SimulSendNativeTx | SimulContractTx =
        token.type === "evm-native"
          ? { from: wallet.address, value: scaledAmount, to: ap_wallets.eth }
          : {
              from: wallet.address,
              to: token.token_id,
              data: transfer.encode(ap_wallets.eth, scaledAmount),
            };

      const { tx: simulated, fee } = await estimateFee(wallet, tx);

      return {
        fee: { amount: fee, symbol: native_currency.symbol },
        tx: { type: "evm", val: simulated },
      };
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}
