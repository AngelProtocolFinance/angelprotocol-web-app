import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { apWallets } from "constants/ap-wallets";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import Decimal from "decimal.js";
import { humanize, logger, scale, scaleToStr } from "helpers";
import { USD } from "helpers/coin-gecko";
import { estimateTx } from "helpers/tx";
import { CryptoSubmitStep } from "slices/donation";
import { ChainID } from "types/chain";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { EstimateInput, EstimateResult, TokenWithAmount } from "types/tx";
import { EstimateStatus } from "../types";

const BASE_FEE_RATE_PCT = 1.5;
const CRYPTO_FEE_RATE_PCT = 1.4;
const FISCAL_SPONSOR_FEE_RATE_PCT = 2.9;

const _fiscalSponsorShipFeeFn =
  (isFiscalSponsored: boolean) => (amount: Decimal) =>
    isFiscalSponsored
      ? amount.mul(FISCAL_SPONSOR_FEE_RATE_PCT).div(100)
      : new Decimal(0);

const prettyDollar = (amount: Decimal) => `$${humanize(amount, 4)}`;

type SimulInput = {
  sender: string;
  token: TokenWithAmount;
  chainID: ChainID;
};

export async function estimateDonation({
  token,
  chainID,
  sender,
}: SimulInput): Promise<Exclude<EstimateStatus, "loading">> {
  let toEstimate: EstimateInput;
  // ///////////// GET TX CONTENT ///////////////

  try {
    switch (chainID) {
      case "juno-1":
      case "uni-6": {
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

        toEstimate = { chainID, val: [msg] };
        break;
      }

      case "pisco-1":
      case "phoenix-1": {
        const scaledAmount = scaleToStr(token.amount, token.decimals);
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
          const scaledAmount = scale(token.amount, token.decimals).toHex();

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
    if (!estimate) {
      return { error: "Simulation failed: transaction likely to fail" };
    }
  } catch (err) {
    logger.error(err);
    return { error: "Simulation failed: transaction likely to fail" };
  }
}
