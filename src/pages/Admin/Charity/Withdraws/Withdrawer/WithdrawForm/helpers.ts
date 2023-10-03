import Decimal from "decimal.js";
import { Except } from "type-fest";
import { FV } from "./types";
import { BridgeFees } from "types/aws";
import { AccountType } from "types/lists";
import { humanize, roundDownToNum } from "helpers";
import { hasElapsed } from "helpers/admin";
import { chainIds } from "constants/chainIds";

export const bridgeFee = (
  destinationChain: string,
  bridgeFees: BridgeFees
): number => {
  switch (destinationChain) {
    case chainIds.binance:
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

type FeeArgs = Except<
  FV,
  "beneficiaryEndowmentId" | "beneficiaryWallet" | "amounts"
> & {
  withdrawAmount: number;
};

const earlyWithdrawRate =
  (accountType: AccountType, maturityTime: number) =>
  (amount: Decimal, bps: number): Decimal =>
    accountType === "liquid"
      ? new Decimal(0)
      : //locked
      hasElapsed(maturityTime)
      ? new Decimal(0)
      : amount.mul(bps).div(FEE_BASIS);

const prettyPCT = (bps: number) =>
  humanize(new Decimal(bps).div(FEE_BASIS).mul(100), 2) + "%";

export const feeData = ({
  destinationChainId,
  withdrawAmount,
  accountType,
  endowFeeRates,
  bridgeFees,
  protocolFeeRates,
  maturityTime,
  beneficiaryType,
}: FeeArgs) => {
  /** Protocol and endowment fees does not apply for transfers to other endowments
   *  bridge fees also doesn't apply as endow to endow transfers are on the same chain
   */

  if (beneficiaryType === "endowment") {
    return { items: [], totalFee: 0, toReceive: withdrawAmount };
  }
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

  const earlyLockedWithdrawFee = earlyWithdrawRate(accountType, maturityTime);

  const earlyLockedWithdrawFeeAp = earlyLockedWithdrawFee(
    withdrawAmountDec,
    protocolFeeRates.earlyLockedWithdrawBps
  );

  const amountLessApFees = withdrawAmountDec
    .sub(withdrawFeeAp)
    .sub(earlyLockedWithdrawFeeAp);

  const withdrawFeeEndow = amountLessApFees
    .mul(endowFeeRates.withdrawBps)
    .div(FEE_BASIS);

  const earlyLockedWithdrawFeeEndow = earlyLockedWithdrawFee(
    amountLessApFees,
    endowFeeRates.withdrawBps
  );

  const _bridgeFee = bridgeFee(destinationChainId, bridgeFees);

  const totalFee = withdrawFeeAp
    .add(earlyLockedWithdrawFeeAp)
    .add(withdrawFeeEndow)
    .add(earlyLockedWithdrawFeeEndow)
    .add(_bridgeFee);

  const toReceive = withdrawAmountDec.sub(totalFee);

  type FeeItem = {
    name: string;
    value: number;
  };
  const items: FeeItem[] = [
    {
      name: `Withdraw Fee ( ${prettyPCT(
        protocolFeeRates.withdrawBps + endowFeeRates.withdrawBps
      )} )`,
      value: roundDownToNum(withdrawFeeAp.add(withdrawFeeEndow), 6),
    },
    {
      name: `Early Withdraw Fee ( ${prettyPCT(
        protocolFeeRates.earlyLockedWithdrawBps +
          endowFeeRates.earlyLockedWithdrawBps
      )} )`,
      value: roundDownToNum(
        earlyLockedWithdrawFeeAp.add(earlyLockedWithdrawFeeEndow),
        6
      ),
    },
    { name: "Bridge Fee", value: roundDownToNum(_bridgeFee, 6) },
    { name: "To Receive", value: roundDownToNum(toReceive, 6) },
  ];

  return {
    items,
    totalFee: roundDownToNum(totalFee, 6),
    toReceive: roundDownToNum(toReceive, 6),
  };
};
