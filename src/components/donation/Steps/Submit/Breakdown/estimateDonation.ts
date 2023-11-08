import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { EstimateInput, EstimateResult } from "types/tx";
import { SubmitStep } from "slices/donation";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import { humanize, logger, scale, scaleToStr } from "helpers";
import { USD } from "helpers/coin-gecko";
import { estimateTx } from "helpers/tx";
import { apWallets } from "constant/ap-wallets";

type EstimateItem = {
  name: string;
  cryptoAmount?: { value: string; symbol: string };
  fiatAmount: number;
  prettyFiatAmount: string; //$, AUD, ETC
};

export type DonationEstimate = EstimateResult & {
  items: EstimateItem[];
};

const BASE_FEE_RATE_PCT = 1.5;
const CRYPTO_FEE_RATE_PCT = 1.4;
const FISCAL_SPONSOR_FEE_RATE_PCT = 2.9;

const _fiscalSponsorShipFeeFn =
  (isFiscalSponsored: boolean) => (amount: Decimal) =>
    isFiscalSponsored
      ? amount.mul(FISCAL_SPONSOR_FEE_RATE_PCT).div(100)
      : new Decimal(0);

const prettyDollar = (amount: Decimal) => `$${humanize(amount, 4)}`;

export async function estimateDonation({
  sender,
  recipient,
  details: {
    token,
    chainId: { value: chainID },
  },
}: SubmitStep & { sender: string }): Promise<DonationEstimate | null> {
  let toEstimate: EstimateInput;
  // ///////////// GET TX CONTENT ///////////////

  const fiscalSponsorShipFeeFn = _fiscalSponsorShipFeeFn(
    recipient.isFiscalSponsored
  );

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
    if (!estimate) return null;

    // ///////////// Sucessful simulation ///////////////
    const [tokenUSD, feeUSD] = await Promise.all([
      USD(token.coingecko_denom),
      USD(estimate.fee.coinGeckoId),
    ]);

    const tokenUSDDec = new Decimal(tokenUSD).mul(token.amount);
    const amount: EstimateItem = {
      name: "Amount",
      cryptoAmount: {
        value: token.amount,
        symbol: token.symbol,
      },
      fiatAmount: tokenUSDDec.toNumber(),
      prettyFiatAmount: `$${humanize(tokenUSDDec, 4)}`,
    };

    const feeUSDDec = new Decimal(feeUSD).mul(estimate.fee.amount);

    const baseFee = tokenUSDDec.mul(BASE_FEE_RATE_PCT).div(100);
    const cryptoFee = tokenUSDDec.mul(CRYPTO_FEE_RATE_PCT).div(100);
    const fiscalSponsorShipFee = fiscalSponsorShipFeeFn(tokenUSDDec);
    //feeUSD is on top of tokenAmountUSD
    const totalFeeDec = baseFee.add(cryptoFee).add(fiscalSponsorShipFee);

    const transactionFee: EstimateItem = {
      name: "Transaction fee",
      cryptoAmount: {
        value: estimate.fee.amount.toString(),
        symbol: estimate.fee.symbol,
      },
      fiatAmount: feeUSDDec.toNumber(),
      prettyFiatAmount: prettyDollar(feeUSDDec),
    };

    const donationFee: EstimateItem = {
      name: "Angel Giving Fee",
      fiatAmount: totalFeeDec.toNumber(),
      prettyFiatAmount: prettyDollar(totalFeeDec),
    };

    const totalDec = tokenUSDDec.sub(totalFeeDec);
    const total: EstimateItem = {
      name: "Estimated proceeds",
      fiatAmount: totalDec.toNumber(),
      prettyFiatAmount: prettyDollar(totalDec),
    };

    return {
      ...estimate,
      items: [amount, donationFee, transactionFee, total],
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
}
