import { ContractQueryArgs } from "services/types";
import {
  AllianceMember,
  FundConfig,
  FundDetails,
  IndexFundOwnerPayload,
} from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class IndexFund extends Contract {
  fundList: ContractQueryArgs;
  allianceMembers: ContractQueryArgs;
  config: ContractQueryArgs;

  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.index_fund);

    this.fundList = {
      address: this.contractAddress,
      msg: { funds_list: {} },
    };

    this.allianceMembers = {
      address: this.contractAddress,
      msg: { alliance_members: {} },
    };

    this.config = {
      address: this.contractAddress,
      msg: { config: {} },
    };
  }

  createEmbeddedFundConfigMsg(config: FundConfig) {
    return this.createEmbeddedWasmMsg([], {
      update_config: config,
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: IndexFundOwnerPayload) {
    return this.createEmbeddedWasmMsg([], {
      update_owner: payload,
    });
  }

  async getFundDetails(fundId: number) {
    const fundDetailsRes = await this.query<{ fund: FundDetails }>({
      fund_details: { fund_id: fundId },
    });
    return fundDetailsRes.fund;
  }

  createEmbeddedCreateFundMsg(fundDetails: Omit<FundDetails, "id">) {
    return this.createEmbeddedWasmMsg([], {
      create_fund: { ...fundDetails },
    });
  }

  createEmbeddedRemoveFundMsg(fundId: number) {
    return this.createEmbeddedWasmMsg([], {
      remove_fund: { fund_id: fundId },
    });
  }

  createEmbeddedUpdateMembersMsg(
    fundId: number,
    toAdd: string[],
    toRemove: string[]
  ) {
    return this.createEmbeddedWasmMsg([], {
      update_members: { fund_id: fundId, add: toAdd, remove: toRemove },
    });
  }

  createEmbeddedAAListUpdateMsg(
    member: AllianceMember,
    action: "add" | "remove"
  ) {
    return this.createEmbeddedWasmMsg([], {
      update_alliance_member_list: { address: member.wallet, member, action },
    });
  }

  createEmbeddedAAMemberEditMsg(member: AllianceMember) {
    return this.createEmbeddedWasmMsg([], {
      update_alliance_member: { address: member.wallet, member },
    });
  }
}

export interface IF extends IndexFund {}
export type T = typeof IndexFund;
