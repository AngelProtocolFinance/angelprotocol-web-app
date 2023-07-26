import Decimal from "decimal.js";
import { Except } from "type-fest";
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

type FeeArgs = Except<FV, "beneficiaryWallet" | "amounts"> & {
  withdrawAmount: number;
};

export const feeData = ({
  destinationChainId,
  withdrawAmount,
  accountType,
  endowFeeRates,
  bridgeFees,
  protocolFeeRates,
  maturityTime,
  endowType,
}: FeeArgs) => {
  /**
   * //RAW AMOUNT//
   * less withdrawFeeAp
   * less earlyWithdrawFee: if locked && !mature
   *
   * // DEDUCTED PROTOCOL FEES // (though earlyWithdrawFeeBps for normal endowments doesn't come from registrar)
   * less withdrawFeeEndow
   *
   * // AMOUNT TO DEPOSIT/ERC20 Transfer //
   * less depositFee ( as transferFee): if locked --> liquid
   * less bridgeFee: if cross chain
   *
   * // AMOUNT TO RECEIVE //
   */

  const withdrawAmountDec = new Decimal(withdrawAmount);

  const withdrawFeeAp = withdrawAmountDec
    .mul(protocolFeeRates.withdrawBps)
    .div(FEE_BASIS);

  const earlyLockedWithdrawFee = (() => {
    if (accountType === "liquid") return new Decimal(0);

    if (endowType === "normal") {
      if (hasElapsed(maturityTime)) return new Decimal(0);
      return withdrawAmountDec
        .mul(endowFeeRates.earlyLockedWithdrawBps)
        .div(FEE_BASIS);
    }

    return withdrawAmountDec
      .mul(protocolFeeRates.earlyLockedWithdrawBps)
      .div(FEE_BASIS);
  })();

  const amountLessApFees = withdrawAmountDec
    .sub(withdrawFeeAp)
    .sub(earlyLockedWithdrawFee);

  const withdrawFeeEndow = amountLessApFees
    .mul(endowFeeRates.withdrawBps)
    .div(FEE_BASIS);

  const toDepositAmount = amountLessApFees.sub(withdrawFeeEndow);

  /** TODO: factor-in locked withdraw to beneficiary wallet
   *  e.g fv.BeneficiaryType
   */
  const depositFee =
    accountType === "locked"
      ? toDepositAmount.mul(endowFeeRates.depositBps).div(FEE_BASIS)
      : new Decimal(0);

  const _bridgeFee = bridgeFee(destinationChainId, bridgeFees);

  const totalFee = withdrawFeeAp
    .add(withdrawFeeEndow)
    .add(earlyLockedWithdrawFee)
    .add(depositFee)
    .add(_bridgeFee);

  const toReceive = toDepositAmount.sub(depositFee).sub(_bridgeFee);

  type FeeItem = {
    name: string;
    value: number;
  };
  const items: FeeItem[] = [
    {
      name: "Withdraw Fee",
      value: roundDownToNum(withdrawFeeAp.add(withdrawFeeEndow), 4),
    },
    {
      name: "Early Withdraw Fee",
      value: roundDownToNum(earlyLockedWithdrawFee),
    },
    { name: "Transfer Fee", value: roundDownToNum(depositFee, 4) },
    { name: "Bridge Fee", value: roundDownToNum(_bridgeFee, 4) },
    { name: "To Receive", value: roundDownToNum(toReceive, 4) },
  ];

  return {
    items,
    totalFee: roundDownToNum(totalFee, 4),
    toReceive: roundDownToNum(toReceive, 4),
  };
};
