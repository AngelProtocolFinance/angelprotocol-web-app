import { Coin, Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import { sc } from "constants/sc";
import { WalletProxy } from "providers/WalletProvider";
import { AllianceMember } from "services/terra/indexFund/types";
import { ContractQueryArgs } from "services/terra/types";
import Contract from "./Contract";
import { FundConfig, FundDetails } from "./types";

export default class Indexfund extends Contract {
  fund_id?: number;
  address: string;
  fundList: ContractQueryArgs;
  allianceMembers: ContractQueryArgs;
  config: ContractQueryArgs;

  constructor(wallet?: WalletProxy, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.address = contracts[this.chainID][sc.index_fund];

    this.fundList = {
      address: this.address,
      msg: { funds_list: {} },
    };

    this.allianceMembers = {
      address: this.address,
      msg: { alliance_members: {} },
    };

    this.config = {
      address: this.address,
      msg: { config: {} },
    };
  }

  createEmbeddedFundConfigMsg(config: FundConfig) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_config: config,
    });
  }

  async getFundDetails(fundId: number) {
    const fundDetailsRes = await this.query<{ fund: FundDetails }>(
      this.address,
      {
        fund_details: { fund_id: fundId },
      }
    );
    return fundDetailsRes.fund;
  }

  createEmbeddedCreateFundMsg(fundDetails: Omit<FundDetails, "id">) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      create_fund: { ...fundDetails },
    });
  }

  createEmbeddedRemoveFundMsg(fundId: number) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      remove_fund: { fund_id: fundId },
    });
  }

  createEmbeddedUpdateMembersMsg(
    fundId: number,
    toAdd: string[],
    toRemove: string[]
  ) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_members: { fund_id: fundId, add: toAdd, remove: toRemove },
    });
  }

  createEmbeddedAAListUpdateMsg(
    member: AllianceMember,
    action: "add" | "remove"
  ) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_alliance_member_list: { address: member.wallet, member, action },
    });
  }

  createEmbeddedAAMemberEditMsg(member: AllianceMember) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_alliance_member: { address: member.wallet, member },
    });
  }

  async createDepositMsg(UST_amount: number | string, splitToLiquid?: number) {
    this.checkWallet(); //throws error when no wallet
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.address,
      {
        deposit: {
          fund_id: this.fund_id,
          split: `${splitToLiquid}`,
        },
      },
      [new Coin(denoms.uusd, micro_UST_Amount)]
    );
  }
}

export interface IF extends Indexfund {}
export type T = typeof Indexfund;
