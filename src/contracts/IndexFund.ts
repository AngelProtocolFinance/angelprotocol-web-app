import {
  AllianceMember,
  FundConfig,
  FundDetails,
  IndexFundOwnerPayload,
} from "types/server/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class IndexFund extends Contract {
  private static address = contracts.index_fund;

  createEmbeddedFundConfigMsg(config: FundConfig) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_config: config,
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: IndexFundOwnerPayload) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_owner: payload,
    });
  }

  async getFundDetails(fundId: number) {
    const fundDetailsRes = await this.query<{ fund: FundDetails }>(
      IndexFund.address,
      {
        fund_details: { fund_id: fundId },
      }
    );
    return fundDetailsRes.fund;
  }

  createEmbeddedCreateFundMsg(fundDetails: Omit<FundDetails, "id">) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      create_fund: { ...fundDetails },
    });
  }

  createEmbeddedRemoveFundMsg(fundId: number) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      remove_fund: { fund_id: fundId },
    });
  }

  createEmbeddedUpdateMembersMsg(
    fundId: number,
    toAdd: string[],
    toRemove: string[]
  ) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_members: { fund_id: fundId, add: toAdd, remove: toRemove },
    });
  }

  createEmbeddedAAListUpdateMsg(
    member: AllianceMember,
    action: "add" | "remove"
  ) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_alliance_member_list: { address: member.wallet, member, action },
    });
  }

  createEmbeddedAAMemberEditMsg(member: AllianceMember) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_alliance_member: { address: member.wallet, member },
    });
  }
}
