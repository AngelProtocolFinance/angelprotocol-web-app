import Decimal from "decimal.js";
import { FV } from "./types";
import { BridgeFees } from "types/aws";
import { roundDownToNum } from "helpers";
import { hasElapsed } from "helpers/admin";
import { chainIds } from "constants/chainIds";

export const bridgeFee = (
  destinationChain: string,
  bridgeFees: BridgeFees
): number => {
  switch (destinationChain) {
    case "binance":
      return Math.ceil(bridgeFees.binance);
    case chainIds.ethereum:
      return Math.ceil(bridgeFees.ethereum);
    case chainIds.terra:
      return Math.ceil(bridgeFees["terra-2"]);
    case chainIds.juno:
      return Math.ceil(bridgeFees.juno);
    default:
      return 0;
  }
};

export const chainName = (
  network: string
): "Binance" | "Ethereum" | "Polygon" | "Terra" | "Juno" => {
  //prettier-ignore
  switch (network) {
    case chainIds.binance: return "Binance";
    case chainIds.polygon: return "Polygon";
    case chainIds.ethereum: return "Ethereum";
    case chainIds.terra: return "Terra";
    default: return "Juno";
  }
};

const FEE_BASIS = 10_000;

export const feeData = ({
  destinationChainId,
  amounts,
  accountType,
  endowFeeRates,
  bridgeFees,
  protocolFeeRates,
  maturityTime,
  endowType,
}: FV) => {
  /**
   * amount
   *
   * - withdrawFee
   * if locked && !mature - earlyWithdrawFee
   * if locked --> liquid - depositFee ( as transferFee)
   *
   * if cross chain, - bridgeFee
   */

  const withdrawAmountDec = new Decimal(amounts[0].value);

  const _bridgeFee = bridgeFee(destinationChainId, bridgeFees);
  const withdrawFee = withdrawAmountDec
    .mul(protocolFeeRates.withdrawBps)
    .div(FEE_BASIS);

  const earlyLockedWithdrawFee = hasElapsed(maturityTime)
    ? new Decimal(0)
    : endowType === "normal"
    ? withdrawAmountDec.mul(endowFeeRates.earlyLockedWithdrawBps).div(FEE_BASIS)
    : withdrawAmountDec
        .mul(protocolFeeRates.earlyLockedWithdrawBps)
        .div(FEE_BASIS);

  const toDepositAmount = withdrawAmountDec
    .sub(withdrawFee)
    .sub(earlyLockedWithdrawFee);

  /** TODO: factor-in locked withdraw to beneficiary wallet
   *  e.g fv.BeneficiaryType
   */
  const depositFee =
    accountType === "locked"
      ? toDepositAmount.mul(endowFeeRates.depositBps).div(FEE_BASIS)
      : new Decimal(0);

  const totalFee = withdrawFee
    .add(earlyLockedWithdrawFee)
    .add(depositFee)
    .add(_bridgeFee);
  const toReceive = toDepositAmount.sub(depositFee).sub(_bridgeFee);

  return {
    items: [
      ["Withdraw Fee", roundDownToNum(withdrawFee)],
      ["Early Withdraw Fee", roundDownToNum(earlyLockedWithdrawFee)],
      ["Deposit Fee", roundDownToNum(depositFee)],
      ["Bridge Fee", roundDownToNum(_bridgeFee)],
      ["To Receive", roundDownToNum(toReceive)],
    ],
    totalFee: roundDownToNum(totalFee),
    toReceive: roundDownToNum(toReceive),
  };
};
