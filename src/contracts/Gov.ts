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
  haloBalance: CQA;
  haloInfo: CQA;
  staker: CQA;
  gov_state: CQA;
  config: CQA;
  polls: CQA;

  private cw20Contract: CW20;

  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.gov);

    this.cw20Contract = new CW20(wallet, contracts.halo_token);
    this.haloInfo = this.cw20Contract.info;
    this.haloBalance = this.cw20Contract.balance(this.contractAddress);

    //query args
    this.staker = {
      address: this.contractAddress,
      msg: { staker: { address: this.walletAddress } },
    };

    this.gov_state = {
      address: this.contractAddress,
      msg: { state: {} },
    };

    this.config = {
      address: this.contractAddress,
      msg: { config: {} },
    };

    this.polls = {
      address: this.contractAddress,
      msg: { polls: {} },
    };
  }

  createGovStakeMsg(amount: number | string) {
    return this.cw20Contract.createSendMsg(amount, this.contractAddress, {
      stake_voting_tokens: {},
    });
  }

  createPollMsgs(
    amount: number,
    title: string,
    description: string,
    link?: string
  ) {
    return this.cw20Contract.createSendMsg(amount, this.contractAddress, {
      create_poll: { title, description, link },
    });
  }

  //halo_gov
  createGovUnstakeMsg(amount: number) {
    const uhalo = new Decimal(amount).mul(1e6).divToInt(1);
    return this.createExecuteContractMsg({
      withdraw_voting_tokens: { amount: uhalo.toString() },
    });
  }

  createGovClaimMsg() {
    return this.createExecuteContractMsg({
      claim_voting_tokens: {},
    });
  }

  createEndPollMsg(poll_id: number) {
    return this.createExecuteContractMsg({
      end_poll: { poll_id: poll_id },
    });
  }

  createVoteMsg(poll_id: number, vote: Vote, amount: number) {
    const uhalo = new Decimal(amount).mul(1e6).divToInt(1);
    return this.createExecuteContractMsg({
      cast_vote: { poll_id, vote, amount: uhalo.toString() },
    });
  }
}
