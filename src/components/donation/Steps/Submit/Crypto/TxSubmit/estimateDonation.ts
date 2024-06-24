import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { apWallets } from "constants/ap-wallets";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import { logger, scale, scaleToStr } from "helpers";
import { estimateTx } from "helpers/tx";
import type { SupportedChainId } from "types/chain";
import type { SimulContractTx, SimulSendNativeTx } from "types/evm";
import type { EstimateInput, TokenWithAmount } from "types/tx";
import type { EstimateStatus } from "../types";
import { tokenBalance } from "./tokenBalance";

export async function estimateDonation(
  token: TokenWithAmount,
  chainID: SupportedChainId,
  sender: string,
  tipAmount: number
): Promise<Exclude<EstimateStatus, "loading">> {
  try {
    const grossAmount = +token.amount + tipAmount;

    const balance = await tokenBalance(token, chainID, sender);
    if (balance < grossAmount) {
      return { error: "Not enough balance" };
    }

    let toEstimate: EstimateInput;
    // ///////////// GET TX CONTENT ///////////////

    switch (chainID) {
      //juno
      case "juno-1":
      case "uni-6":
      //kujira
      case "kaiyo-1":
      case "harpoon-4":
      //stargaze
      case "stargaze-1":
      case "elgafar-1":
      //osmosis
      case "osmosis-1":
      case "osmo-test-5": {
        const scaledAmount = scaleToStr(grossAmount, token.decimals);
        const to = apWallets.junoDeposit;
        const msg =
          token.type === "juno-native" ||
          token.type === "kujira-native" ||
          token.type === "stargaze-native" ||
          token.type === "osmosis-native" ||
          token.type === "ibc"
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

        toEstimate = { chainID, val: [msg] };
        break;
      }
      case "pisco-1":
      case "phoenix-1": {
        const scaledAmount = scaleToStr(grossAmount, token.decimals);
        const msg =
          token.type === "terra-native" || token.type === "ibc"
            ? new MsgSend(sender, apWallets.terra, [
                new Coin(token.token_id, scaledAmount),
              ])
            : new MsgExecuteContract(sender, token.token_id, {
                transfer: {
                  amount: scaledAmount,
                  recipient: apWallets.terra,
                },
              });
        toEstimate = { chainID, val: [msg] };
        break;
      }
      //evm chains
      default: {
        const tx: SimulSendNativeTx | SimulContractTx = (() => {
          const scaledAmount = scale(grossAmount, token.decimals).toHex();

          switch (token.type) {
            case "evm-native":
              return {
                from: sender,
                value: scaledAmount,
                to: apWallets.evmDeposit,
              };
            //"erc20"
            default: {
              return createTx(sender, "erc20.transfer", {
                erc20: token.token_id,
                to: apWallets.evmDeposit,
                amount: scaledAmount,
              });
            }
          }
        })();

        toEstimate = { chainID, val: tx };
      }
    }

    // ///////////// ESTIMATE TX ///////////////
    const estimate = await estimateTx(toEstimate, { address: sender });
    return (
      estimate || { error: "Simulation result: transaction likely to fail" }
    );
  } catch (err) {
    logger.error(err);
    return { error: GENERIC_ERROR_MESSAGE };
  }
}
