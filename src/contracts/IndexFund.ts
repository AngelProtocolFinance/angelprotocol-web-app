import { Coin, Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import { sc } from "constants/sc";
import { ContractQueryArgs } from "services/terra/types";
import Contract from "./Contract";
import { FundDetails, FundListRes } from "./types";

export default class Indexfund extends Contract {
  fund_id?: number;
  address: string;
  fundList: ContractQueryArgs;
  tcaMembers: ContractQueryArgs;

  constructor(wallet?: ConnectedWallet, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.address = contracts[this.chainID][sc.index_fund];

    this.fundList = {
      address: this.address,
      msg: { funds_list: {} },
    };

    this.tcaMembers = {
      address: this.address,
      msg: { tca_list: {} },
    };
  }

  //on demand queries
  getFundList() {
    return this.query<FundListRes>(this.address, this.fundList.msg);
  }

  createEmbeddedCreateFundMsg(fundDetails: FundDetails) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      create_fund: { fund: fundDetails },
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

  createEmbeddedUpdateTCAMsg(toAdd: string[], toRemove: string[]) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_members: { add: toAdd, remove: toRemove },
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
