import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { Estimate, TxContent } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/donation";
import GiftCard from "contracts/GiftCard";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import { logger, scale, scaleToStr } from "helpers";
import { estimateTx } from "helpers/tx";
import { ap_wallets } from "constants/ap_wallets";
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

  let content: TxContent;
  // ///////////// GET TX CONTENT ///////////////
  try {
    if (chain.type === "juno-native") {
      const { fromBal, fromGift } = getBreakdown(token);

      const msgs = [];
      if (fromBal) {
        const scaledAmount = scaleToStr(fromBal, token.decimals);
        const sender = wallet.address;
        const recipient = ap_wallets.juno_deposit;
        msgs.push(
          token.type === "juno-native" || token.type === "ibc"
            ? createCosmosMsg(sender, "recipient.send", {
                recipient,
                amount: scaledAmount,
                denom: token.token_id,
              })
            : createCosmosMsg(sender, "cw20.transfer", {
                recipient,
                amount: scaledAmount,
                cw20: token.token_id,
              })
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
      content = { type: "cosmos", val: msgs };
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

      content = { type: "terra", val: [msg], wallet: terraWallet! };
    }
    // evm transactions
    else {
      const scaledAmount = scale(token.amount, token.decimals).toHex();
      const tx: SimulSendNativeTx | SimulContractTx =
        token.type === "evm-native"
          ? { from: wallet.address, value: scaledAmount, to: ap_wallets.eth }
          : createTx(wallet.address, "erc20.transfer", {
              erc20: token.token_id,
              to: ap_wallets.eth,
              amount: scaledAmount,
            });

      content = { type: "evm", val: tx };
    }
    // ///////////// ESTIMATE TX ///////////////
    return estimateTx(content, wallet);
  } catch (err) {
    logger.error(err);
    return null;
  }
}
