import { Completed, TFee } from "slices/launchpad/types";
import { EndowmentFee, NewAIF } from "types/contracts";
import { isEmpty, roundDown, roundDownToNum } from "helpers";

export default function toJunoAIF(
  {
    1: about,
    2: management,
    3: whitelists,
    4: maturity,
    5: splits,
    6: fees,
  }: Completed,
  creator: string
): NewAIF {
  return {
    owner: creator,
    maturity_time: new Date(maturity.date).getTime() / 1000,
    name: about.name,
    categories: { sdgs: [], general: [] },
    endow_type: "normal",
    cw4_members: isEmpty(management.members)
      ? [{ addr: creator, weight: 1 }]
      : management.members.map((m) => ({ addr: m.addr, weight: +m.weight })),
    kyc_donors_only: false, //default
    cw3_threshold: {
      absolute_percentage: {
        percentage: roundDown(+management.proposal.threshold / 100, 2),
      },
    },
    cw3_max_voting_period: roundDownToNum(
      +management.proposal.duration * 60 * 60,
      0
    ),
    beneficiaries_allowlist: whitelists.beneficiaries,
    contributors_allowlist: whitelists.contributors,
    split_to_liquid: {
      min: toPct(splits.min),
      max: toPct(splits.max),
      default: toPct(splits.default),
    },
    ignore_user_splits: !splits.isCustom,
    earnings_fee: fees.earnings.isActive
      ? toEndowFee(fees.earnings)
      : undefined,
    deposit_fee: fees.deposit.isActive ? toEndowFee(fees.deposit) : undefined,
    withdraw_fee: fees.withdrawal.isActive
      ? toEndowFee(fees.withdrawal)
      : undefined,
  };
}

function toPct(num: string | number): string {
  return roundDown(+num / 100, 2);
}

function toEndowFee(fee: TFee): EndowmentFee {
  return {
    payout_address: fee.receiver,
    fee_percentage: roundDown(+fee.rate / 100, 2),
    active: fee.isActive,
  };
}
