import { ConnectedWallet } from "@terra-money/wallet-provider";
import {
  MsgExecuteContract,
  // Coin,
  Dec,
  CreateTxOptions,
  // StdFee,
} from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { PollExecuteMsg, sc, Vote } from "./types";
import { GovState } from "services/terra/gov/types";
import { ContractQueryArgs } from "services/terra/types";
import { Airdrops } from "services/aws/airdrop/types";
// import { denoms } from "constants/currency";

export default class Halo extends Contract {
  airdrop_addr: string;
  token_address: string;
  gov_address: string;
  staker: ContractQueryArgs;
  gov_balance: ContractQueryArgs;
  gov_state: ContractQueryArgs;
  polls: ContractQueryArgs;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.token_address = contracts[this.chainID][sc.halo_token];
    this.gov_address = contracts[this.chainID][sc.halo_gov];
    this.airdrop_addr = contracts[this.chainID][sc.airdrop];

    //query args
    this.staker = {
      address: this.gov_address,
      msg: { staker: { address: wallet?.walletAddress } },
    };

    this.gov_balance = {
      address: this.token_address,
      msg: { balance: { address: this.gov_address } },
    };

    this.gov_state = {
      address: this.gov_address,
      msg: { state: {} },
    };

    this.polls = {
      address: this.gov_address,
      msg: { polls: {} },
    };
  }

  createGovStakeMsg(amount: number | string): MsgExecuteContract {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return new MsgExecuteContract(this.walletAddr!, this.token_address, {
      send: {
        amount: uhalo.toString(),
        contract: this.gov_address,
        msg: btoa(JSON.stringify({ stake_voting_tokens: {} })),
      },
    });
  }

  async getGovState() {
    return this.query<GovState>(this.gov_address, this.gov_state.msg);
  }

  //halo_token
  async createGovStakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const stake_msg = this.createGovStakeMsg(amount);
    const fee = await this.estimateFee([stake_msg]);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [stake_msg], fee };
  }

  async createGovClaimTx(): Promise<CreateTxOptions> {
    this.checkWallet();
    const claim_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      { claim_voting_tokens: {} }
    );
    const fee = await this.estimateFee([claim_msg]);
    return { msgs: [claim_msg], fee };
  }

  async createPoll(
    amount: number,
    title: string,
    description: string,
    link?: string,
    msgs?: PollExecuteMsg[],
    snapshot = false
  ) {
    this.checkWallet();
    const u_amount = new Dec(amount).mul(1e6).toInt();
    const poll_msgs: MsgExecuteContract[] = [];
    const poll_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.token_address,
      {
        send: {
          amount: u_amount.toString(),
          contract: this.gov_address,
          msg: btoa(
            JSON.stringify({ create_poll: { title, description, link } })
          ),
        },
      }
    );

    poll_msgs.push(poll_msg);

    if (snapshot) {
      const gov_state = await this.getGovState();
      const snapshot_msg = new MsgExecuteContract(
        this.walletAddr!,
        this.gov_address,
        {
          snapshot_poll: { poll_id: gov_state.poll_count + 1 },
        }
      );
      poll_msgs.push(snapshot_msg);
    }

    const fee = await this.estimateFee(poll_msgs);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: poll_msgs, fee };
  }

  //halo_gov
  async createEndPollTx(poll_id: string) {
    this.checkWallet();
    const poll_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      { end_poll: { poll_id: +poll_id } }
    );
    const fee = await this.estimateFee([poll_msg]);
    return { msgs: [poll_msg], fee };
  }

  async createGovUnstakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    const unstake_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      { withdraw_voting_tokens: { amount: uhalo.toString() } }
    );
    const fee = await this.estimateFee([unstake_msg]);
    return { msgs: [unstake_msg], fee };
  }

  async createVoteTx(poll_id: string, vote: Vote, amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    const vote_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      {
        cast_vote: { poll_id: +poll_id, vote, amount: uhalo.toString() },
      }
    );
    const fee = await this.estimateFee([vote_msg]);
    return { msgs: [vote_msg], fee };
  }

  async createAirdropClaimTx(
    airdrops: Airdrops,
    is_stake = false,
    stake_amount = "0"
  ): Promise<CreateTxOptions> {
    this.checkWallet();
    const claim_msgs = airdrops.map(
      ({ stage, haloTokens, proof }) =>
        new MsgExecuteContract(this.walletAddr!, this.airdrop_addr, {
          claim: { stage, amount: haloTokens, proof },
        })
    );

    if (is_stake) {
      const stake_msg = this.createGovStakeMsg(stake_amount);
      claim_msgs.push(stake_msg);
    }

    const fee = await this.estimateFee(claim_msgs);
    return { msgs: claim_msgs, fee };
  }
}
