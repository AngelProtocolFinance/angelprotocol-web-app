import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import Dec from "decimal.js";
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
  fund_id?: number;
  contractAddr: string;
  fundList: ContractQueryArgs;
  allianceMembers: ContractQueryArgs;
  config: ContractQueryArgs;

  constructor(walletAddr?: string, fund_id?: number) {
    super(walletAddr);
    this.fund_id = fund_id;
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

  async createDepositMsg(UST_amount: number | string, splitToLiquid?: number) {
    this.checkWallet(); //throws error when no wallet
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.contractAddr,
      {
        deposit: {
          fund_id: this.fund_id,
          split: `${splitToLiquid}`,
        },
      },
      [new Coin("uusd", micro_UST_Amount)]
    );
  }
}

export interface IF extends Indexfund {}
export type T = typeof Indexfund;
