import { ContractQueryArgs } from "services/types";
import {
  AllianceMember,
  FundConfig,
  FundDetails,
  IndexFundOwnerPayload,
} from "types/server/contracts";
import { scaleAmount } from "helpers/amountFormatters";
import { contracts } from "constants/contracts";
import { junoDenom } from "constants/currency";
import Contract from "./Contract";

export default class Indexfund extends Contract {
  contractAddr: string;
  fundId?: number;
  fundList: ContractQueryArgs;
  allianceMembers: ContractQueryArgs;
  config: ContractQueryArgs;

  constructor(walletAddr?: string, fundId?: number) {
    super(walletAddr);
    this.contractAddr = contracts.index_fund;
    this.fundId = fundId;

    this.fundList = {
      address: this.contractAddr,
      msg: { funds_list: {} },
    };

    this.allianceMembers = {
      address: this.contractAddr,
      msg: { alliance_members: {} },
    };

    this.config = {
      address: this.contractAddr,
      msg: { config: {} },
    };
  }

  createEmbeddedFundConfigMsg(config: FundConfig) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      update_config: config,
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: IndexFundOwnerPayload) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      update_owner: payload,
    });
  }

  async getFundDetails(fundId: number) {
    const fundDetailsRes = await this.query<{ fund: FundDetails }>(
      this.contractAddr,
      {
        fund_details: { fund_id: fundId },
      }
    );
    return fundDetailsRes.fund;
  }

  createEmbeddedCreateFundMsg(fundDetails: Omit<FundDetails, "id">) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      create_fund: { ...fundDetails },
    });
  }

  createEmbeddedRemoveFundMsg(fundId: number) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      remove_fund: { fund_id: fundId },
    });
  }

  createEmbeddedUpdateMembersMsg(
    fundId: number,
    toAdd: string[],
    toRemove: string[]
  ) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      update_members: { fund_id: fundId, add: toAdd, remove: toRemove },
    });
  }

  createEmbeddedAAListUpdateMsg(
    member: AllianceMember,
    action: "add" | "remove"
  ) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      update_alliance_member_list: { address: member.wallet, member, action },
    });
  }

  createEmbeddedAAMemberEditMsg(member: AllianceMember) {
    return this.createEmbeddedWasmMsg([], this.contractAddr, {
      update_alliance_member: { address: member.wallet, member },
    });
  }

  async createDepositMsg(amount: number | string, splitToLiquid?: number) {
    return this.createContractMsg(
      this.walletAddr!,
      this.contractAddr,
      {
        deposit: {
          fund_id: this.fundId,
          split: `${splitToLiquid}`,
        },
      },
      [{ amount: scaleAmount(amount), denom: junoDenom }]
    );
  }
}

export interface IF extends Indexfund {}
export type T = typeof Indexfund;
