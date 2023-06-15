import { Completed, TFee } from "slices/launchpad/types";
import { Fee, NewAST, SettingsPermission } from "types/contracts";
import { isEmpty, roundDownToNum } from "helpers";
import { blockTime } from "helpers/admin";
import { toContractSplit } from "helpers/ast";
import { ADDRESS_ZERO } from "constants/evm";

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
    owner: creator,
    withdrawBeforeMaturity: true, //not specified in launchpad design
    maturityTime: maturity.willMature ? blockTime(maturity.date) : 0,
    // maturityHeight: 0; //not specified in launchpad design
    maturityHeight: 0,
    name: about.name,
    categories: { sdgs: [], general: [] }, //not specified in launchpad design
    tier: 0, //not specified in launchpad design
    endowType: 1,
    logo: "/images/angelprotocol-rounded-logo.png",
    image: "",
    members: isEmpty(management.members) ? [creator] : management.members, //in launchpad design, weight is specified for each member
    kycDonorsOnly: false, //not specified in launchpad design
    threshold: +management.proposal.threshold,
    maxVotingPeriod: {
      enumData: 1,
      data: {
        height: 0,
        time: roundDownToNum(+management.proposal.duration * 60 * 60, 0),
      },
    },
    allowlistedBeneficiaries: whitelists.beneficiaries,
    allowlistedContributors: whitelists.contributors,

    //not used in contract
    splitMax: 100 - +splits.max,
    splitMin: 100 - +splits.min,
    splitDefault: +splits.default,

    // //fees
    earlyLockedWithdrawFee: toEndowFee(fees.earlyWithdraw),
    withdrawFee: toEndowFee(fees.withdrawal),
    depositFee: toEndowFee(fees.deposit),
    balanceFee: toEndowFee(fees.balance), //not included in launchpad, for edit later

    //dao (overriden by bool createDao ):not included in launchpad, for edit later
    dao: {
      quorum: 0,
      threshold: 0,
      votingPeriod: 0,
      timelockPeriod: 0,
      expirationPeriod: 0,
      proposalDeposit: 0,
      snapshotPeriod: 0,
      token: {
        token: 0,
        data: {
          existingData: ADDRESS_ZERO,
          newInitialSupply: "0",
          newName: "",
          newSymbol: "",
          veBondingType: {
            ve_type: 0,
            data: {
              value: 0,
              scale: 0,
              slope: 0,
              power: 0,
            },
          },
          veBondingName: "",
          veBondingSymbol: "",
          veBondingDecimals: 0,
          veBondingReserveDenom: ADDRESS_ZERO,
          veBondingReserveDecimals: 0,
          veBondingPeriod: 0,
        },
      },
    },
    createDao: false,

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
      categories: defaultSetting,
      splitToLiquid: defaultSetting,
      ignoreUserSplits: defaultSetting,
    },
    // settingsController: SettingsController; //not included in launchpad, for edit later
    parent: 0,
    maturityAllowlist: maturity.beneficiaries,
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
