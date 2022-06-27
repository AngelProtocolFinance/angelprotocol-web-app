import { Dec } from "@terra-money/terra.js";
import { ContractQueryArgs as CQA } from "services/types";
import { GovState, Vote } from "types/server/contracts";
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

  constructor(walletAddr?: string) {
    super(walletAddr);
    this.govContractAddr = contracts.gov;
    this.haloContractAddr = contracts.halo_token;

    this.haloInfo = new CW20(this.haloContractAddr, walletAddr).info;
    this.haloBalance = new CW20(this.haloContractAddr, walletAddr).balance(
      this.govContractAddr
    );
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

  async getGovState() {
    return this.query<GovState>(this.govContractAddr, this.gov_state.msg);
  }

  createGovStakeMsg(amount: number | string) {
    this.checkWallet();
    const cw20Contract = new CW20(this.haloContractAddr, this.walletAddr);
    return cw20Contract.createSendMsg(amount, this.govContractAddr, {
      stake_voting_tokens: {},
    });
  }

  async createPollMsgs(
    amount: number,
    title: string,
    description: string,
    link?: string
    // msgs?: PollExecuteMsg[]
  ) {
    const cw20Contract = new CW20(this.haloContractAddr, this.walletAddr);
    return cw20Contract.createSendMsg(amount, this.govContractAddr, {
      create_poll: { title, description, link },
    });
  }

  //halo_gov
  createGovUnstakeMsg(amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return this.createContractMsg(this.walletAddr!, this.govContractAddr, {
      withdraw_voting_tokens: { amount: uhalo.toString() },
    });
  }

  createGovClaimMsg() {
    this.checkWallet();
    return this.createContractMsg(this.walletAddr!, this.govContractAddr, {
      claim_voting_tokens: {},
    });
  }

  createEndPollMsg(poll_id: number) {
    this.checkWallet();
    return this.createContractMsg(this.walletAddr!, this.govContractAddr, {
      end_poll: { poll_id: poll_id },
    });
  }

  createVoteMsg(poll_id: number, vote: Vote, amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return this.createContractMsg(this.walletAddr!, this.govContractAddr, {
      cast_vote: { poll_id, vote, amount: uhalo.toString() },
    });
  }
}
