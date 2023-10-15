import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import Decimal from "decimal.js";
import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { EstimatedTx, TxContent } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { SubmitStep } from "slices/donation";
import createCosmosMsg from "contracts/createCosmosMsg";
import { createTx } from "contracts/createTx/createTx";
import { humanize, logger, scale, scaleToStr } from "helpers";
import { usdValue as _usdValue } from "helpers/coin-gecko";
import { estimateTx } from "helpers/tx";
import { apWallets } from "constants/ap-wallets";

type EstimateItem = {
  name: string;
  cryptoAmount?: { value: string; symbol: string };
  fiatAmount: number;
  prettyFiatAmount: string; //$, AUD, ETC
};

export type DonationEstimate = {
  tx: EstimatedTx;
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
  recipient,
  details: { token },
  wallet,
  terraWallet,
}: SubmitStep & {
  wallet: ConnectedWallet;
  terraWallet?: TerraConnectedWallet;
}): Promise<DonationEstimate | null> {
  let content: TxContent;
  // ///////////// GET TX CONTENT ///////////////

  const fiscalSponsorShipFeeFn = _fiscalSponsorShipFeeFn(
    recipient.isFiscalSponsored
  );

  try {
    if (wallet.type === "cosmos") {
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
    else if (wallet.type === "terra") {
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
          //"erc20"
          default: {
            return createTx(wallet.address, "erc20.transfer", {
              erc20: token.token_id,
              to: apWallets.evmDeposit,
              amount: scaledAmount,
            });
          }
        }
      })();

      content = { type: "evm", val: tx };
    }
    // ///////////// ESTIMATE TX ///////////////
    const txEstimate = await estimateTx(content, wallet);
    if (!txEstimate) return null;

    // ///////////// Sucessful simulation ///////////////
    const [tokenUSDValue, feeUSDValue] = await Promise.all([
      _usdValue(token.coingecko_denom),
      _usdValue(txEstimate.fee.coinGeckoId),
    ]);

    const tokenUSDAmountDec = new Decimal(tokenUSDValue).mul(token.amount);
    const amount: EstimateItem = {
      name: "Amount",
      cryptoAmount: {
        value: token.amount,
        symbol: token.symbol,
      },
      fiatAmount: tokenUSDAmountDec.toNumber(),
      prettyFiatAmount: `$${humanize(tokenUSDAmountDec, 4)}`,
    };

    const feeUSDValueAmount = new Decimal(feeUSDValue).mul(
      txEstimate.fee.amount
    );

    const baseFee = tokenUSDAmountDec.mul(BASE_FEE_RATE_PCT).div(100);
    const cryptoFee = feeUSDValueAmount.mul(CRYPTO_FEE_RATE_PCT).div(100);
    const fiscalSponsorShipFee = fiscalSponsorShipFeeFn(tokenUSDAmountDec);
    //feeUSD is on top of tokenAmountUSD
    const totalFeeDec = baseFee.add(cryptoFee).add(fiscalSponsorShipFee);

    const transactionFee: EstimateItem = {
      name: "Transaction fee",
      cryptoAmount: {
        value: txEstimate.fee.amount.toString(),
        symbol: txEstimate.fee.symbol,
      },
      fiatAmount: feeUSDValueAmount.toNumber(),
      prettyFiatAmount: prettyDollar(feeUSDValueAmount),
    };

    const donationFee: EstimateItem = {
      name: "Angel Giving Fee",
      fiatAmount: totalFeeDec.toNumber(),
      prettyFiatAmount: prettyDollar(totalFeeDec),
    };

    const totalDec = tokenUSDAmountDec.sub(totalFeeDec);
    const total: EstimateItem = {
      name: "Estimated proceeds",
      fiatAmount: totalDec.toNumber(),
      prettyFiatAmount: prettyDollar(totalDec),
    };

    return {
      tx: txEstimate.tx,
      items: [amount, donationFee, transactionFee, total],
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
}
