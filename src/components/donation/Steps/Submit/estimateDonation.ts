import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { Estimate, TxContent } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { FiatWallet, SubmitStep, isFiat } from "slices/donation";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import { logger, scale, scaleToStr } from "helpers";
import { estimateTx } from "helpers/tx";
import { ap_wallets } from "constants/ap_wallets";

export async function estimateDonation({
  recipient,
  details: { token, pctLiquidSplit },
  wallet,
  terraWallet,
}: SubmitStep & {
  wallet: WalletState | FiatWallet;
  terraWallet?: ConnectedWallet;
}): Promise<Estimate | null> {
  let content: TxContent;
  // ///////////// GET TX CONTENT ///////////////
  try {
    if (isFiat(wallet) || token.type === "fiat") {
      return {
        fee: { amount: 5, symbol: token.symbol },
        tx: {
          /** not used */
        } as any,
      };
    }

    const { chain } = wallet;

    if (chain.type === "juno-native") {
      const sender = wallet.address;
      const scaledAmount = scaleToStr(token.amount, token.decimals);
      const to = ap_wallets.juno_deposit;
      const msg =
        token.type === "juno-native" || token.type === "ibc"
          ? createCosmosMsg(sender, "recipient.send", {
              recipient: to,
              amount: scaledAmount,
              denom: token.token_id,
            })
          : createCosmosMsg(sender, "cw20.transfer", {
              recipient: to,
              amount: scaledAmount,
              cw20: token.token_id,
            });

      content = { type: "cosmos", val: [msg] };
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
      const tx: SimulSendNativeTx | SimulContractTx = (() => {
        const scaledAmount = scale(token.amount, token.decimals).toHex();
        switch (token.type) {
          case "evm-native":
            return {
              from: wallet.address,
              value: scaledAmount,
              to: ap_wallets.eth,
            };
          default: {
            return createTx(wallet.address, "erc20.transfer", {
              erc20: token.token_id,
              to: ap_wallets.eth,
              amount: scaledAmount,
            });
          }
        }
      })();

      content = { type: "evm", val: tx };
    }
    // ///////////// ESTIMATE TX ///////////////
    return estimateTx(content, wallet);
  } catch (err) {
    logger.error(err);
    return null;
  }
}
