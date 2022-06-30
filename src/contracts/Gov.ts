import Decimal from "decimal.js";
import { ContractQueryArgs as CQA } from "services/types";
import { Vote } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import CW20 from "./CW20";
import Contract from "./Contract";

export interface G extends Gov {}
export type TG = typeof Gov;

export default class Gov extends Contract {
  govContractAddr: string;
  haloContractAddr: string;
  haloBalance: CQA;
  haloInfo: CQA;
  staker: CQA;
  gov_state: CQA;
  config: CQA;
  polls: CQA;

  private cw20Contract: CW20;

  constructor(wallet?: WalletState) {
    super(wallet);
    this.govContractAddr = contracts.gov;
    this.haloContractAddr = contracts.halo_token;

    this.cw20Contract = new CW20(this.haloContractAddr, wallet);
    this.haloInfo = this.cw20Contract.info;
    this.haloBalance = this.cw20Contract.balance(this.govContractAddr);

    //query args
    this.staker = {
      address: this.govContractAddr,
      msg: { staker: { address: this.walletAddr } },
    };

    this.gov_state = {
      address: this.govContractAddr,
      msg: { state: {} },
    };

    this.config = {
      address: this.govContractAddr,
      msg: { config: {} },
    };

    this.polls = {
      address: this.govContractAddr,
      msg: { polls: {} },
    };
  }

  createGovStakeMsg(amount: number | string) {
    return this.cw20Contract.createSendMsg(amount, this.govContractAddr, {
      stake_voting_tokens: {},
    });
  }

  createPollMsgs(
    amount: number,
    title: string,
    description: string,
    link?: string
  ) {
    return this.cw20Contract.createSendMsg(amount, this.govContractAddr, {
      create_poll: { title, description, link },
    });
  }

  //halo_gov
  createGovUnstakeMsg(amount: number) {
    const uhalo = new Decimal(amount).mul(1e6).divToInt(1);
    return this.createExecuteContractMsg(this.govContractAddr, {
      withdraw_voting_tokens: { amount: uhalo.toString() },
    });
  }

  createGovClaimMsg() {
    return this.createExecuteContractMsg(this.govContractAddr, {
      claim_voting_tokens: {},
    });
  }

  createEndPollMsg(poll_id: number) {
    return this.createExecuteContractMsg(this.govContractAddr, {
      end_poll: { poll_id: poll_id },
    });
  }

  createVoteMsg(poll_id: number, vote: Vote, amount: number) {
    const uhalo = new Decimal(amount).mul(1e6).divToInt(1);
    return this.createExecuteContractMsg(this.govContractAddr, {
      cast_vote: { poll_id, vote, amount: uhalo.toString() },
    });
  }
}
