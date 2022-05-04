import { Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { GovState } from "services/terra/gov/types";
import { ContractQueryArgs as CQA } from "services/terra/types";
import { WalletProxy } from "providers/WalletProvider";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import CW20 from "./CW20";
import Contract from "./Contract";
import { Vote } from "./types";

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

  constructor(wallet?: WalletProxy) {
    super(wallet);
    this.govContractAddr = contracts[this.chainID][sc.gov];
    this.haloContractAddr = contracts[this.chainID][sc.halo_token];

    this.haloInfo = new CW20(this.haloContractAddr, wallet).info;
    this.haloBalance = new CW20(this.haloContractAddr, wallet).balance(
      this.govContractAddr
    );
    //query args
    this.staker = {
      address: this.govContractAddr,
      msg: { staker: { address: wallet?.address } },
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

  createGovStakeMsg(amount: number | string): MsgExecuteContract {
    this.checkWallet();
    const cw20Contract = new CW20(this.haloContractAddr, this.wallet);
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
    const cw20Contract = new CW20(this.haloContractAddr, this.wallet);
    const pollMsgs: MsgExecuteContract[] = [];
    const createPollMsg = cw20Contract.createSendMsg(
      amount,
      this.govContractAddr,
      { create_poll: { title, description, link } }
    );
    const govState = await this.getGovState();
    const snapShotMsg = new MsgExecuteContract(
      this.walletAddr!,
      this.govContractAddr,
      {
        snapshot_poll: { poll_id: govState.poll_count + 1 },
      }
    );
    pollMsgs.push(createPollMsg);
    pollMsgs.push(snapShotMsg);
    return pollMsgs;
  }

  //halo_gov
  createGovUnstakeMsg(amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return new MsgExecuteContract(this.walletAddr!, this.govContractAddr, {
      withdraw_voting_tokens: { amount: uhalo.toString() },
    });
  }

  createGovClaimMsg() {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.govContractAddr, {
      claim_voting_tokens: {},
    });
  }

  createEndPollMsg(poll_id: number) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.govContractAddr, {
      end_poll: { poll_id: poll_id },
    });
  }

  createVoteMsg(poll_id: number, vote: Vote, amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return new MsgExecuteContract(this.walletAddr!, this.govContractAddr, {
      cast_vote: { poll_id, vote, amount: uhalo.toString() },
    });
  }
}
