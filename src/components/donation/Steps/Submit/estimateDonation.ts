import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Asset } from "types/contracts";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { Estimate, TxContent } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { FiatWallet, SubmitStep, isFiat } from "slices/donation";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import { logger, scale, scaleToStr } from "helpers";
import { estimateTx } from "helpers/tx";
import { apWallets } from "constants/ap-wallets";
import { ADDRESS_ZERO } from "constants/evm";

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
      const to = apWallets.junoDeposit;
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
          ? new MsgSend(wallet.address, apWallets.terra, [
              new Coin(token.token_id, scaledAmount),
            ])
          : new MsgExecuteContract(wallet.address, token.token_id, {
              transfer: {
                amount: scaledAmount,
                recipient: apWallets.terra,
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
              to: apWallets.evmDeposit,
            };
          case "erc20": {
            return createTx(wallet.address, "erc20.transfer", {
              erc20: token.token_id,
              to: apWallets.evmDeposit,
              amount: scaledAmount,
            });
          }
          //gifts
          default: {
            const isNative = token.type === "evm-native-gift";
            const asset: Asset = {
              info: isNative ? 1 : 0,
              amount: scaledAmount,
              addr: isNative ? ADDRESS_ZERO : token.token_id,
              name: "",
            };
            return createTx(wallet.address, "gift-card.spend", {
              asset,
              id: recipient.id,
              lockedPCT: 100 - pctLiquidSplit,
              liquidPCT: pctLiquidSplit,
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
