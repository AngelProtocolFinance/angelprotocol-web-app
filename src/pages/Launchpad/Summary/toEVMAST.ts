import { Completed, TFee } from "slices/launchpad/types";
import { Fee, NewAST, SettingsPermission } from "types/contracts";
import { isEmpty } from "helpers";
import { blockTime, fromHours } from "helpers/admin";
import { toContractSplit } from "helpers/ast";
import { ADDRESS_ZERO } from "constant/evm";

export default function toEVMAST(
  {
    1: about,
    2: management,
    3: whitelists,
    4: maturity,
    5: splits, //locked
    6: fees,
  }: Completed,
  creator: string
): NewAST {
  return {
    withdrawBeforeMaturity: true, //not specified in launchpad design
    maturityTime: maturity.willMature ? blockTime(maturity.date) : 0,
    name: about.name,
    sdgs: [], //not specified in launchpad design
    tier: 0, //not specified in launchpad design
    endowType: 1,
    logo: "/images/angelprotocol-rounded-logo.png",
    image: "",
    members: isEmpty(management.members) ? [creator] : management.members, //in launchpad design, weight is specified for each member
    threshold: +management.proposal.threshold,
    duration: fromHours(+management.proposal.duration),
    allowlistedBeneficiaries: whitelists.beneficiaries,
    allowlistedContributors: whitelists.contributors,
    maturityAllowlist: maturity.beneficiaries,
    // //fees
    earlyLockedWithdrawFee: toEndowFee(fees.earlyWithdraw),
    withdrawFee: toEndowFee(fees.withdrawal),
    depositFee: toEndowFee(fees.deposit),
    balanceFee: toEndowFee(fees.balance), //not included in launchpad, for edit later

    proposalLink: 0, //not specified in launchpad design

    settingsController: {
      acceptedTokens: defaultSetting,
      lockedInvestmentManagement: defaultSetting,
      liquidInvestmentManagement: defaultSetting,
      allowlistedBeneficiaries: defaultSetting,
      allowlistedContributors: defaultSetting,
      maturityAllowlist: defaultSetting,
      maturityTime: defaultSetting,
      earlyLockedWithdrawFee: defaultSetting,
      withdrawFee: defaultSetting,
      depositFee: defaultSetting,
      balanceFee: defaultSetting,
      name: defaultSetting,
      image: defaultSetting,
      logo: defaultSetting,
      sdgs: defaultSetting,
      splitToLiquid: defaultSetting,
      ignoreUserSplits: defaultSetting,
    },
    // settingsController: SettingsController; //not included in launchpad, for edit later
    parent: 0,
    ignoreUserSplits: !splits.isCustom,
    splitToLiquid: toContractSplit(splits),

    referralId: fees.referral_id || 0,
  };
}

function toEndowFee(fee: TFee): Fee {
  const [addr, bps] = fee.isActive
    ? [fee.receiver, +fee.rate * 100]
    : [ADDRESS_ZERO, 0];

  return {
    payoutAddress: addr,
    bps,
  };
}

const defaultSetting: SettingsPermission = {
  locked: false,
  delegate: { addr: ADDRESS_ZERO, expires: 0 },
};
