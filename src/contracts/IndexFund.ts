import { ContractQueryArgs } from "services/types";
import {
  AllianceMember,
  FundConfig,
  FundDetails,
  IndexFundOwnerPayload,
} from "types/server/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Indexfund extends Contract {
  contractAddr: string;
  fundList: ContractQueryArgs;
  allianceMembers: ContractQueryArgs;
  config: ContractQueryArgs;

  constructor(walletAddr?: string) {
    super(walletAddr);
    this.contractAddr = contracts.index_fund;

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
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
      update_config: config,
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: IndexFundOwnerPayload) {
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
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
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
      create_fund: { ...fundDetails },
    });
  }

  createEmbeddedRemoveFundMsg(fundId: number) {
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
      remove_fund: { fund_id: fundId },
    });
  }

  createEmbeddedUpdateMembersMsg(
    fundId: number,
    toAdd: string[],
    toRemove: string[]
  ) {
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
      update_members: { fund_id: fundId, add: toAdd, remove: toRemove },
    });
  }

  createEmbeddedAAListUpdateMsg(
    member: AllianceMember,
    action: "add" | "remove"
  ) {
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
      update_alliance_member_list: { address: member.wallet, member, action },
    });
  }

  createEmbeddedAAMemberEditMsg(member: AllianceMember) {
    return this.createdEmbeddedWasmMsg([], this.contractAddr, {
      update_alliance_member: { address: member.wallet, member },
    });
  }
}

export interface IF extends Indexfund {}
export type T = typeof Indexfund;
